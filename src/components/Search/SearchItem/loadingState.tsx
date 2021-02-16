import { StyleSheet, View } from 'react-native';

import { $white } from '../../../utils/colors';
import LoadingDots from '../../shared/LoadingDots';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    backgroundColor: $white,
    height: 100,
    marginVertical: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const LoadingState = () => {
  return (
    <View style={styles.container}>
      <LoadingDots />
    </View>
  );
};

export default LoadingState;
