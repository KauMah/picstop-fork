import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import CustomHeader from '../components/shared/CustomHeader';
import Notification from '../components/Notification';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
  },
  image: {
    width: '70%',
  },
});

const Notifications = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Notifications" />
      <ScrollView>
        <Notification
          type="comment"
          url="https://www.kurin.com/wp-content/uploads/placeholder-square.jpg"
          username="ndoherty"
        />
        <Notification
          type="like"
          url="https://www.kurin.com/wp-content/uploads/placeholder-square.jpg"
          username="ndoherty"
        />
        <Notification
          type="follow"
          url="https://www.kurin.com/wp-content/uploads/placeholder-square.jpg"
          username="ndoherty"
        />
        <Notification
          type="request"
          url="https://www.kurin.com/wp-content/uploads/placeholder-square.jpg"
          username="ndoherty"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
