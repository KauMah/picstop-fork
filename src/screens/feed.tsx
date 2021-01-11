import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import CustomHeader from '../components/shared/CustomHeader';
import FeedItem from '../components/Feed/FeedItem/component';
import React from 'react';
import { reduxState } from '../redux/actionTypes';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 2,
  },
});

const Feed = () => {
  const tok: string = useSelector((state: reduxState) => state.token);
  console.log('once loaded', tok);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={'Home'} />
      <ScrollView>
        <FeedItem
          username={'Koosh'}
          comments={4}
          likes={200}
          createdAt={'1h ago'}
          profileUrl={'uhh'}
          imageUrl={'uhh'}
        />
        <FeedItem
          username={'Koosh'}
          comments={4}
          likes={200}
          createdAt={'1h ago'}
          profileUrl={'uhh'}
          imageUrl={'uhh'}
        />
        <FeedItem
          username={'Koosh'}
          comments={4}
          likes={200}
          createdAt={'1h ago'}
          profileUrl={'uhh'}
          imageUrl={'uhh'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;
