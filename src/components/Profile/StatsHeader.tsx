/* eslint-disable react-native/no-inline-styles */
import { $lighterBlue, $lighterGray, $mainBlue } from '../../utils/colors';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { exo, uploadImageToS3 } from '../../utils/api';

import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
import { rollbar } from '../../utils/rollbar';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  proPicContainer: {
    flex: 1,
  },
  proPic: {
    flex: 1,
    alignSelf: 'stretch',
  },
  topHalf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  stacked: {
    flexDirection: 'column',
  },
  nameInfo: {},
  username: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 17,
  },
  location: {
    fontFamily: 'Kumbh Sans',
    fontWeight: '400',
    fontSize: 15,
  },
  button: {
    display: 'flex',
    height: 28,
    paddingHorizontal: 5,
    paddingTop: 3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: $mainBlue,
    backgroundColor: $lighterBlue,
  },
  buttonText: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 15,
    color: $mainBlue,
  },
  bigNumber: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 19,
  },
  numberLabel: {
    fontFamily: 'Kumbh Sans',
    fontWeight: '400',
    fontSize: 15,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  greyBar: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: $lighterGray,
  },
  cell: {
    paddingHorizontal: 10,
  },
});

interface Props {
  _id: string;
  username: string;
  location: string;
  followers: number;
  profileUrl: string;
  following: number;
  savedLocation: number;
  onPfpUpdated: () => void;
}

const StatsHeader = (props: Props) => {
  const navigation = useNavigation();
  const [pfpUpdated, setPfpUpdated] = useState(false);
  return (
    <View style={styles.container}>
      <View
        style={styles.proPicContainer}
        onTouchEnd={() => {
          ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true,
            forceJpg: true,
            includeBase64: true,
          }).then(async (image) => {
            exo.post('/user/profilePicture', { id: props._id }).then((res) => {
              uploadImageToS3(
                `file://${_.get(image, 'path', '')}`,
                _.get(res.data, 'uploadUrl', ''),
              )
                .then(() => {
                  Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Profile successfully updated!!',
                  });
                  setPfpUpdated(!pfpUpdated);
                  props.onPfpUpdated();
                })
                .catch((err) => {
                  rollbar.error(`Failed to update profile picture: ${err}`);
                  Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Upload Failed!',
                  });
                });
            });
          });
        }}>
        {props.profileUrl ? (
          <Image
            style={styles.proPic}
            source={{ uri: props.profileUrl }}
            resizeMode="contain"
            key={props.profileUrl}
          />
        ) : (
          <View style={styles.proPic} />
        )}
      </View>
      <View style={styles.stacked}>
        <View style={styles.topHalf}>
          <View style={styles.nameInfo}>
            <Text style={styles.username}>{props.username}</Text>
            <Text style={styles.location}>{props.location}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsRow}>
          <View
            style={{ ...styles.cell, paddingLeft: 0 }}
            onTouchEnd={() =>
              navigation.navigate('Followers', {
                userId: props._id,
                which: 'followers',
              })
            }>
            <Text style={styles.bigNumber}>{props.followers}</Text>
            <Text style={styles.numberLabel}>Followers</Text>
          </View>
          <View
            style={{ ...styles.greyBar, ...styles.cell }}
            onTouchEnd={() =>
              navigation.navigate('Following', {
                userId: props._id,
                which: 'following',
              })
            }>
            <Text style={styles.bigNumber}>{props.following}</Text>
            <Text style={styles.numberLabel}>Following</Text>
          </View>
          <View style={{ ...styles.cell, paddingRight: 0 }}>
            <Text style={styles.bigNumber}>{props.savedLocation}</Text>
            <Text style={styles.numberLabel}>Locations</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StatsHeader;
