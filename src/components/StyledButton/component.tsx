import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {
  lighterBlue,
  lighterGreen,
  mainBlue,
  mainGreen,
} from '../../utils/colors';

import React from 'react';

interface Styles {
  button: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  button: {
    display: 'flex',
    height: 50,
    width: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  text: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 60,
    paddingTop: 17,
    paddingBottom: 19,
  },
});

interface Props {
  text: String;
  type: 'green' | 'blue';
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
}

const StyledButton = ({ text, type, onPress, style }: Props) => {
  switch (type) {
    case 'green':
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPress}
          style={[
            {
              ...styles.button,
              borderColor: mainGreen,
              backgroundColor: lighterGreen,
            },
            style,
          ]}>
          <Text style={{ ...styles.text, color: mainGreen }}>{text}</Text>
        </TouchableOpacity>
      );
    case 'blue':
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPress}
          style={[
            {
              ...styles.button,
              borderColor: mainBlue,
              backgroundColor: lighterBlue,
            },
            style,
          ]}>
          <Text style={{ ...styles.text, color: mainBlue }}>{text}</Text>
        </TouchableOpacity>
      );
  }
};

export default StyledButton;
