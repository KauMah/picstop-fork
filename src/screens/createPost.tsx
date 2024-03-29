import { $lightBlack, $mainBlue, $mainGreen } from '../utils/colors';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { exo, uploadImageToS3 } from '../utils/api';

import IconTextField from '../components/shared/IconTextField';
import ImagePicker from 'react-native-image-crop-picker';
import { Location } from '../types';
import MapThumbnail from '../components/shared/MapThumbnail';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { rollbar } from '../utils/rollbar';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    height: '95%',
    justifyContent: 'space-between',
  },
  scroll: {
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    zIndex: 10,
  },
  stacked: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  back: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 17,
    color: $mainBlue,
  },
  post: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 17,
    color: $mainGreen,
  },
  title: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 22,
  },
  location: {
    fontFamily: 'Kumbh Sans',
    fontWeight: '400',
    fontSize: 16,
    opacity: 0.8,
    color: $lightBlack,
  },
  preview: {
    height: 200,
    width: '100%',
    marginVertical: 10,
  },
  map: {
    width: '100%',
    height: 250,
    top: 0,
  },
  caption: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

const CreatePost = () => {
  const navigation = useNavigation();
  const [picked, setPicked] = useState(false);
  const [picUri, setPicUri] = useState('');
  const [picRes, setPicRes] = useState('');
  const [locations, setLocations] = useState<Array<Location>>([]);
  const [usrLoc, setUsrLoc] = useState<Location>();
  const [caption, setCaption] = useState('');
  const _map = useRef<MapboxGL.MapView>(null);
  const _camera = useRef<MapboxGL.Camera>(null);
  const _loc = useRef<MapboxGL.UserLocation>(null);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text onPress={() => navigation.goBack()} style={styles.back}>
          Back
        </Text>
        <View style={styles.stacked}>
          <Text style={styles.title}>Add Photo</Text>
          <Text style={styles.location}>
            {usrLoc && (usrLoc.name !== '' ? usrLoc.name : 'No Location added')}
          </Text>
        </View>
        <Text
          onPress={async () => {
            if (caption.length > 0 && usrLoc && picked) {
              exo
                .post('/posts/create', {
                  caption: caption,
                  location: usrLoc._id,
                  files: 1,
                })
                .then(async (res) => {
                  const urls = _.get(
                    res.data,
                    'message.uploadUrls',
                    'nothing I guess',
                  );
                  uploadImageToS3(`file://${picUri}`, urls[0]).then(() => {
                    setCaption('');
                    setUsrLoc(undefined);
                    setPicked(false);
                    setPicUri('');
                    setPicRes('');
                    navigation.goBack();
                  });
                })
                .catch((err) => rollbar.error(`Image Upload Failed: ${err}`));
            } else {
              Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Missing fields for post creation!',
              });
            }
          }}
          style={styles.post}>
          Post
        </Text>
      </View>
      <ScrollView style={styles.scroll}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : undefined}
          keyboardVerticalOffset={125}>
          <View style={styles.container}>
            <View
              onTouchStart={() => {
                ImagePicker.openPicker({
                  freeStyleCropEnabled: true,
                  cropping: true,
                  forceJpg: true,
                  includeBase64: true,
                })
                  .then((image) => {
                    setPicked(true);
                    setPicUri(_.get(image, 'path', ''));
                    setPicRes(_.get(image, 'data', ''));
                  })
                  .catch((err) => {
                    rollbar.error(`Image selection failed: ${err}`);
                    setPicked(false);
                  });
              }}>
              <Image
                style={styles.preview}
                defaultSource={require('../../assets/img/picstop-no-text.png')}
                source={{ uri: `data:image/jpeg;base64,${picRes}` }}
                resizeMode="contain"
              />
            </View>
            <MapboxGL.MapView
              ref={_map}
              style={styles.map}
              styleURL={'mapbox://styles/kaumah/ckjeur5kx7uud19mc0zr67xkm'}
              rotateEnabled={false}
              onRegionDidChange={_.throttle(async (feature) => {
                const coords = feature.geometry.coordinates;
                exo
                  .post('/locations/near', {
                    long: coords[0],
                    lat: coords[1],
                    maxDistance: 1000,
                  })
                  .then((response) => {
                    const allLocations = _.concat(
                      locations,
                      _.get(response.data, 'message', []),
                    );
                    setLocations(_.uniqBy(allLocations, (loc) => loc._id));
                  })
                  .catch((err) => {
                    rollbar.error(`Find nearby locations failed: ${err}`);
                    Toast.show({
                      type: 'error',
                      position: 'top',
                      text1:
                        'Something went wrong, please close the app and try again',
                    });
                  });
                _camera;
              }, 1000)}
              onDidFinishRenderingMapFully={async () => {
                const coords = _.get(_loc.current?.state, 'coordinates', [
                  0,
                  0,
                ]);
                exo
                  .post('/locations/near', {
                    long: coords[0],
                    lat: coords[1],
                    maxDistance: 1000,
                  })
                  .then((response) => {
                    setLocations(_.get(response.data, 'message', []));
                  })
                  .catch((err) =>
                    rollbar.error(`Find nearby locations failed: ${err}`),
                  );
                _camera.current?.moveTo(coords);
                setTimeout(() => {
                  _camera.current?.zoomTo(10);
                }, 500);
              }}
              animated>
              <MapboxGL.Camera ref={_camera} zoomLevel={10} />
              <MapboxGL.UserLocation visible animated ref={_loc} />
              {locations.map((loc: Location) => (
                <MapThumbnail
                  key={loc._id}
                  location={loc}
                  onPress={() => {
                    setUsrLoc(loc);
                  }}
                />
              ))}
            </MapboxGL.MapView>
            <IconTextField
              style={styles.caption}
              icon={faComment}
              value={caption}
              onChangeText={(text) => setCaption(text)}
              placeholder={'Enter a caption'}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CreatePost;
