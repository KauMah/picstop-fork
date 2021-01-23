import { StyleSheet, Text, View } from 'react-native';

import { $mainGray } from '../../utils/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 30,
  },
  text: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 18,
    color: $mainGray,
    marginTop: 10,
  },
});
const EmptyPostState = () => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faCamera} size={100} color={$mainGray} />
      <Text style={styles.text}>No posts yet!</Text>
    </View>
  );
};

export default EmptyPostState;
