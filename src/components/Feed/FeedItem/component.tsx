import {
  $darkerGray,
  $errorRed,
  $mainGray,
  $white,
} from '../../../utils/colors';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Post, User } from '../../../types';
import React, { useEffect, useState } from 'react';

import { Image } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import StyledButton from '../../shared/StyledButton';
import TimeAgo from 'javascript-time-ago';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
import en from 'javascript-time-ago/locale/en';
import { exo } from '../../../utils/api';
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
  touchable: {
    width: 30,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: $white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    marginVertical: 10,
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
  const [location, setLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const initialUser = {
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
  const [user, setUser] = useState<User>(initialUser);

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
      exo
        .get(`/locations/${props.post.location}`)
        .then((res) => {
          setLocation(_.get(res.data, 'message.location.name', 'Location'));
        })
        .catch((err) => {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error fetching location',
            text2: JSON.stringify(err),
          });
          setLocation('Location');
        });
      setLoading(false);
    }
  }, [loading, props]);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('hello');
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                console.log('hello there');
              }}>
              <View style={styles.modal}>
                <StyledButton
                  style={styles.modalButton}
                  type={'blue'}
                  text={'Report'}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Report', { postId: props.post._id });
                  }}
                />
                {props.post.authorId === props.userId && (
                  <StyledButton
                    style={styles.modalButton}
                    type={'red'}
                    text={'Delete'}
                    onPress={() => {
                      setModalVisible(false);
                      exo
                        .delete(`/posts/delete/${props.post._id}`)
                        .then(() => {
                          Toast.show({
                            type: 'success',
                            text1: 'Success',
                            text2: 'Deleted post',
                          });
                        })
                        .catch(() =>
                          Toast.show({
                            type: 'error',
                            text1: 'Network Error',
                            text2: 'Could not delete post'!,
                          }),
                        );
                    }}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.infoContainer}>
        {user.profilePic ? (
          <Image
            style={styles.proPic}
            resizeMode={'cover'}
            source={{
              uri: user.profilePic,
            }}
            key={user.profilePic}
          />
        ) : (
          <View style={styles.proPic} />
        )}
        <View style={styles.infoText}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.locationName}>{location}</Text>
        </View>
        <View style={styles.agoContainer}>
          <Text style={styles.timeAgo}>
            {timeAgo.format(new Date(props.post.createdAt))}
          </Text>
        </View>
      </View>
      <View style={styles.imgContainer}>
        {props.post.images[0] ? (
          <Image
            source={{
              uri: props.post.images[0],
            }}
            style={styles.image}
          />
        ) : (
          <View style={styles.image} />
        )}
      </View>
      <View style={styles.infoContainer}>
        <View
          onTouchStart={() =>
            liked
              ? exo.post(`/posts/unlike/${props.post._id}`).then(() => {
                  props.post.likes = props.post.likes.filter((value) => {
                    value !== props.userId;
                  });
                  setLiked(false);
                })
              : exo.post(`/posts/like/${props.post._id}`).then(() => {
                  props.post.likes.push(props.userId);
                  setLiked(true);
                })
          }>
          <Ionicon
            size={20}
            name={liked ? 'heart-sharp' : 'heart-outline'}
            color={liked ? $errorRed : $mainGray}
          />
        </View>
        <Text
          onPress={() =>
            navigation.navigate('Likes', { postId: props.post._id })
          }
          style={styles.amount}>
          {props.post.likes.length}
        </Text>
        <View onTouchStart={() => navigation.navigate('Comments')}>
          <Ionicon size={20} name={'ios-chatbox-outline'} color={$mainGray} />
        </View>
        <Text style={styles.amount}>{props.post.comments.length}</Text>
        <View style={styles.agoContainer}>
          <View
            style={styles.touchable}
            onTouchStart={() => setModalVisible(!modalVisible)}>
            <Ionicon
              size={25}
              name={'ellipsis-horizontal-circle'}
              color={$mainGray}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FeedItem;
