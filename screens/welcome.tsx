import {Image, SafeAreaView, Text, View} from 'react-native';

import React from 'react';

const Welcome = () => {
  return (
    <View>
      <SafeAreaView>
        <Image source={require('../assets/picstop-logo.png')} />
        <Text>Henlo</Text>
      </SafeAreaView>
    </View>
  );
};

export default Welcome;
