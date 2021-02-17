import { $black, $lighterGray, $white } from '../utils/colors';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Location as LocType, Post } from '../types';
import React, { useEffect, useState } from 'react';

import _ from 'lodash';
import { exo } from '../utils/api';
import { rollbar } from '../utils/rollbar';
import { useRoute } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: $white,
    height: '100%',
  },
  infoContainer: {
    padding: 20,
  },
  banner: {
    borderRadius: 15,
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    color: $black,
    fontSize: 22,
    lineHeight: 28,
  },
  subtitle: {
    fontFamily: 'Kumbh Sans',
    fontWeight: '400',
    color: $black,
    fontSize: 16,
    lineHeight: 19,
    opacity: 0.8,
  },
  postContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  square: {
    width: '33.33%',
    height: 1,
    aspectRatio: 1,
  },
  gray: {
    backgroundColor: $lighterGray,
  },
});

const Location: React.FC = () => {
  const route = useRoute();
  const initialLoc = {
    __v: 0,
    _id: '',
    createdAt: '',
    geoLocation: {
      coordinates: [],
      type: '',
    },
    name: '',
    images: '',
    isOfficial: false,
    updatedAt: '',
  };
  const [location, setLocation] = useState<LocType>(initialLoc);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (loading) {
      const id = _.get(route.params, 'locationId');
      exo
        .get(`/locations/${id}`)
        .then((result) => {
          setLocation(_.get(result.data, 'message.location'));
          exo.get(`/locations/posts/${id}`).then((res) => {
            setPosts(_.get(res.data, 'message', []));
            setLoading(false);
          });
        })
        .catch((err) => {
          rollbar.error(`Failed to get Location by id: ${err}`);
        });
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          style={[styles.banner]}
          resizeMode={'cover'}
          source={{
            uri: 'https://ychef.files.bbci.co.uk/624x351/p02s026r.jpg',
          }}
        />
        <Text style={styles.title}>{location.name}</Text>
        <Text style={styles.subtitle}>{location.name}</Text>
      </View>
      <ScrollView style={styles.postContainer}>
        {console.log(posts)}
        {posts.map((post, index) => (
          <LocationTile post={post} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

interface TileProps {
  post: Post;
}

const LocationTile: React.FC<TileProps> = (props) => {
  return (
    <View
      style={styles.square}
      onTouchEnd={() => {
        console.log('This leads somewhere');
      }}>
      <Image style={styles.gray} source={{ uri: props.post.images[0] }} />
    </View>
  );
};

export default Location;
