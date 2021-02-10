import { SafeAreaView, StyleSheet } from 'react-native';

import React from 'react';
import CustomHeader from '../components/shared/CustomHeader';
import Notification from '../components/Notificiation';

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
    </SafeAreaView>
  );
};

export default Notifications;
