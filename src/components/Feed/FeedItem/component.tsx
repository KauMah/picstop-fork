import { StyleSheet, Text, View } from 'react-native';
import { darkerGray, mainGray } from '../../../utils/colors';
import { faCommentAlt, faHeart } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Image } from 'react-native';
import React from 'react';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    padding: 20,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoText: {
    flexDirection: 'column',
  },
  username: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
  },
  locationName: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    color: darkerGray,
  },
  proPic: {
    height: 45,
    width: 45,
    marginRight: 10,
  },
  imgContainer: {
    height: 250,
    width: '100%',
    marginVertical: 10,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  agoContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  timeAgo: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    color: mainGray,
  },
  amount: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
    color: mainGray,
    paddingHorizontal: 5,
  },
  icon: {
    height: 20,
    width: 20,
  },
});

interface Props {
  iconUrl: string;
  locationName: string;
  username: string;
  imageUrl: string;
  likes: number;
  comments: number;
  createdAt: string;
}

const FeedItem = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.proPic}
          resizeMode={'cover'}
          source={{ uri: props.iconUrl }}
        />
        <View style={styles.infoText}>
          <Text style={styles.username}>{props.username}</Text>
          <Text style={styles.locationName}>{props.locationName}</Text>
        </View>
        <View style={styles.agoContainer}>
          <Text style={styles.timeAgo}>{props.createdAt}</Text>
        </View>
      </View>
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri: props.imageUrl,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <View onTouchStart={() => console.log('likes')}>
          <FontAwesomeIcon
            style={styles.icon}
            icon={faHeart}
            color={mainGray}
          />
        </View>
        <Text style={styles.amount}>{props.likes}</Text>
        <View onTouchStart={() => console.log('comments')}>
          <FontAwesomeIcon
            style={styles.icon}
            icon={faCommentAlt}
            color={mainGray}
          />
        </View>
        <Text style={styles.amount}>{props.comments}</Text>
        <View
          style={styles.agoContainer}
          onTouchStart={() => console.log('report and more')}>
          <FontAwesomeIcon
            style={styles.icon}
            icon={faEllipsisH}
            color={mainGray}
          />
        </View>
      </View>
    </View>
  );
};

export default FeedItem;
