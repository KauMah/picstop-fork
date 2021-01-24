import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
  requestLocationAccuracy,
} from 'react-native-permissions';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import CustomHeader from '../components/shared/CustomHeader';
import EmptyPostState from '../components/Profile/emptyState';
import Loading from './loading';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';
import { exo } from '../utils/api';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 2,
  },
});

const PostStack = createStackNavigator();

const FeedRoutes = () => {
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name="Feed"
        component={Feed}
        options={{ headerShown: false }}
      />
      <PostStack.Screen name="Post" component={Loading} />
      <PostStack.Screen name="Post/Likes" component={Loading} />
      <PostStack.Screen name="Post/Comments" component={Loading} />
    </PostStack.Navigator>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('heyo');
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
      switch (result) {
        case RESULTS.DENIED:
          request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(() => {
            requestLocationAccuracy({
              purposeKey: 'MapLocations',
            }).then(() => {
              console.info('Location Services granted');
            });
          });
          break;
        default:
          break;
      }
    });
  }, []);

  useEffect(() => {
    if (userId !== '') {
      exo
        .post('/posts/feed/', { userId: userId })
        .then((res) => {
          console.log(_.get(res.data, 'message', []));
          setPosts(_.get(res.data, 'message.posts', []));
        })
        .catch((e) => console.log('big error', e));
    }
  }, [userId]);

  useEffect(() => {
    if (loading) {
      exo
        .get('/user/')
        .then((response) => {
          const id = _.get(response, 'data.message._id', '');
          setUserId(id);
        })
        .catch((e) => console.log(e));
      setLoading(false);
    }
  }, [loading, posts]);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={'Home'} />
      <ScrollView>
        {/* <FeedItem
          username={'Koosh'}
          userId={'blarg'}
          locationName={'Paris'}
          comments={['this is cool', 'this is uncool']}
          likes={['blah', 'blarg']}
          id={'blooper'}
          createdAt={'1h ago'}
          imageUrl={
            'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg'
          }
          iconUrl={
            'https://www.kenblakemoreartdesign.com/wp-content/uploads/2017/07/fullsizeoutput_696.jpeg'
          }
        /> */}
        {posts.length < 1 && <EmptyPostState />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedRoutes;
