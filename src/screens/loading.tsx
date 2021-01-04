import { Image, SafeAreaView, StyleSheet } from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#FFF',
    height: '100%',
  },
  image: {
    width: '70%',
  },
});

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/img/picstop-logo.png')}
        style={styles.image}
        resizeMode={'contain'}
      />
    </SafeAreaView>
  );
};
export default Loading;
