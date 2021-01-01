import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import React from 'react';

interface Styles {
  button: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  button: {
    display: 'flex',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
  },
});

interface Props {
  text: String;
}

const SubmitButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text>Hey poo poo</Text>
    </TouchableOpacity>
  );
};
export default SubmitButton;
