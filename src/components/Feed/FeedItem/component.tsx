import { $darkerGray, $errorRed, $mainGray } from '../../../utils/colors';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { faCommentAlt, faHeart } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Image } from 'react-native';
import { Post } from '../../../types';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { exo } from '../../../utils/api';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo('en-US');

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
    color: $darkerGray,
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
    color: $mainGray,
  },
  amount: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
    color: $mainGray,
    paddingHorizontal: 5,
  },
  icon: {
    height: 20,
    width: 20,
  },
});

interface Props {
  post: Post;
  userId: string;
}

const FeedItem = (props: Props) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const initial = {
    username: '',
    followers: [],
    following: [],
    private: false,
    profilePic: '',
    savedLocations: [],
    email: '',
    _id: '',
    blocked: [],
  };
  const [user, setUser] = useState(initial);

  console.log(props.post.images[0]);
  useEffect(() => {
    exo.get(`user/getById/${props.post.authorId}`).then((response) => {
      setUser(response.data.message.user);
    });
  }, [props.post.authorId]);

  useEffect(() => {
    if (loading) {
      props.post.likes.includes(props.userId)
        ? setLiked(true)
        : setLiked(false);
      setLoading(false);
    }
  }, [loading, props]);
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.proPic}
          resizeMode={'cover'}
          source={{
            uri: user.profilePic,
          }}
        />
        <View style={styles.infoText}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.locationName}>{'Boston MA'}</Text>
        </View>
        <View style={styles.agoContainer}>
          <Text style={styles.timeAgo}>
            {timeAgo.format(new Date(props.post.createdAt))}
          </Text>
        </View>
      </View>
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri: props.post.images[0],
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <View
          onTouchStart={() =>
            liked
              ? exo.post(`/posts/unlike/${props.post._id}`).then((res) => {
                  console.log(res.data);
                  setLiked(false);
                })
              : exo.post(`/posts/like/${props.post._id}`).then((res) => {
                  console.log(res.data);
                  setLiked(true);
                })
          }>
          <FontAwesomeIcon
            style={styles.icon}
            icon={liked ? faSolidHeart : faHeart}
            color={liked ? $errorRed : $mainGray}
          />
        </View>
        <Text
          onPress={() => navigation.navigate('Likes')}
          style={styles.amount}>
          {liked ? props.post.likes.length + 1 : props.post.likes.length}
        </Text>
        <View onTouchStart={() => navigation.navigate('Comments')}>
          <FontAwesomeIcon
            style={styles.icon}
            icon={faCommentAlt}
            color={$mainGray}
          />
        </View>
        <Text style={styles.amount}>{props.post.comments.length}</Text>
      </View>
      <View
        style={styles.agoContainer}
        onTouchStart={() => navigation.navigate('Report')}>
        <FontAwesomeIcon
          style={styles.icon}
          icon={faEllipsisH}
          color={$mainGray}
        />
      </View>
    </View>
  );
};

export default FeedItem;
