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
          locationName={'Paris'}
          comments={2}
          likes={12}
          createdAt={'1h ago'}
          imageUrl={
            'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg'
          }
          iconUrl={
            'https://www.kenblakemoreartdesign.com/wp-content/uploads/2017/07/fullsizeoutput_696.jpeg'
          }
        />
        <FeedItem
          username={'Koosh'}
          locationName={'Paris'}
          comments={1}
          likes={0}
          createdAt={'2h ago'}
          imageUrl={
            'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg'
          }
          iconUrl={
            'https://www.kenblakemoreartdesign.com/wp-content/uploads/2017/07/fullsizeoutput_696.jpeg'
          }
        />
        <FeedItem
          username={'Koosh'}
          locationName={'Paris'}
          comments={0}
          likes={1}
          createdAt={'3h ago'}
          imageUrl={
            'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg'
          }
          iconUrl={
            'https://www.kenblakemoreartdesign.com/wp-content/uploads/2017/07/fullsizeoutput_696.jpeg'
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;
