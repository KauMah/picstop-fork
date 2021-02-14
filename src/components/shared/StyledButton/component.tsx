import {
  $errorRed,
  $lighterBlue,
  $lighterGreen,
  $lighterRed,
  $mainBlue,
  $mainGreen,
} from '../../../utils/colors';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

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
    paddingHorizontal: 50,
    paddingTop: 17,
    paddingBottom: 19,
  },
});

interface Props {
  text: String;
  type: 'green' | 'blue' | 'red';
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  disabled?: boolean;
  small?: boolean;
}

const StyledButton = ({
  text,
  type,
  onPress,
  style,
  disabled,
  small,
}: Props) => {
  const disabledButton = disabled ? { opacity: 0.5 } : {};
  const smallText = small
    ? { fontSize: 16, paddingHorizontal: 25, paddingTop: 8 }
    : {};
  const smallButton = small ? { height: 30 } : {};
  switch (type) {
    case 'green':
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={disabled ? () => {} : onPress}
          disabled={disabled}
          style={[
            {
              ...styles.button,
              ...smallButton,
              borderColor: $mainGreen,
              backgroundColor: $lighterGreen,
            },
            style,
            disabledButton,
          ]}>
          <Text style={{ ...styles.text, ...smallText, color: $mainGreen }}>
            {text}
          </Text>
        </TouchableOpacity>
      );
    case 'blue':
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={disabled ? () => {} : onPress}
          disabled={disabled}
          style={[
            {
              ...styles.button,
              ...smallButton,
              borderColor: $mainBlue,
              backgroundColor: $lighterBlue,
            },
            style,
            disabledButton,
          ]}>
          <Text style={{ ...styles.text, ...smallText, color: $mainBlue }}>
            {text}
          </Text>
        </TouchableOpacity>
      );
    case 'red':
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={disabled ? () => {} : onPress}
          disabled={disabled}
          style={[
            {
              ...styles.button,
              ...smallButton,
              borderColor: $errorRed,
              backgroundColor: $lighterRed,
            },
            style,
            disabledButton,
          ]}>
          <Text style={{ ...styles.text, ...smallText, color: $errorRed }}>
            {text}
          </Text>
        </TouchableOpacity>
      );
  }
};

export default StyledButton;
