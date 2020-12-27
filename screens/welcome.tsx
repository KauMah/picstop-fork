import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
  },
});

const Welcome = () => {
  return (
    <View>
      <SafeAreaView>
        <Image source={require('../assets/picstop-logo.png')} />
        <Text style={styles.headerText}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default Welcome;
