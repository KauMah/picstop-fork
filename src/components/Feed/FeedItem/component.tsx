import { StyleSheet, Text, View } from 'react-native';
import { faCommentAlt, faHeart } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Image } from 'react-native';
import React from 'react';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { mainGray } from '../../../utils/colors';

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
  proPic: {
    height: 45,
    width: 45,
    marginRight: 10,
  },
  imgContainer: {
    height: 300,
    width: '100%',
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
  profileUrl: string;
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
          resizeMode={'contain'}
          source={require('../../../../assets/img/picstop-no-text.png')}
          // source={require(props.profileUrl)}
        />
        <View style={styles.infoText}>
          <Text style={styles.username}>{props.username}</Text>
        </View>
        <View style={styles.agoContainer}>
          <Text style={styles.timeAgo}>{props.createdAt}</Text>
        </View>
      </View>
      <View style={styles.imgContainer}>
        <Image
          source={require('../../../../assets/img/picstop-logo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <FontAwesomeIcon style={styles.icon} icon={faHeart} color={mainGray} />
        <Text style={styles.amount}>{props.likes}</Text>
        <FontAwesomeIcon
          style={styles.icon}
          icon={faCommentAlt}
          color={mainGray}
        />
        <Text style={styles.amount}>{props.comments}</Text>
        <View style={styles.agoContainer}>
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
