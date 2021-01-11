import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  View,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import {
  black,
  errorRed,
  lighterGray,
  mainBlue,
  mainGray,
  white,
} from '../../../utils/colors';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: lighterGray,
    borderRadius: 12,
    backgroundColor: white,
  },
  text: {
    color: black,
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    width: '100%',
    height: 60,
    fontSize: 18,
    paddingLeft: 10,
  },
  iconContainer: {
    borderRightWidth: 1,
    borderRightColor: lighterGray,
  },
  icon: {
    marginTop: 13,
    marginHorizontal: 10,
  },
});

type Props = React.ComponentProps<typeof TextInput> & {
  placeholder?: string;
  style?: ViewStyle;
  icon: IconDefinition;
  invalid?: boolean;
};

const IconTextField = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { placeholder, style, icon, invalid = false } = props;
  const changedStyle = invalid
    ? {
        iconContainer: {
          borderRightColor: errorRed,
        },
        view: {
          borderColor: errorRed,
        },
      }
    : isFocused
    ? {
        iconContainer: {
          borderRightColor: mainBlue,
        },
        view: {
          borderColor: mainBlue,
        },
      }
    : {};
  return (
    <View style={[styles.view, style, changedStyle.view]}>
      <View style={[styles.iconContainer, changedStyle.iconContainer]}>
        <FontAwesomeIcon
          icon={icon}
          size={30}
          color={invalid ? errorRed : isFocused ? mainBlue : mainGray}
          style={styles.icon}
        />
      </View>
      <TextInput
        style={styles.text}
        placeholder={placeholder}
        placeholderTextColor={mainGray}
        onFocus={() => setIsFocused(true)}
        onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          setIsFocused(false);
          if (props.onBlur) {
            props.onBlur(e);
          }
        }}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        onChange={props.onChange}
        onChangeText={props.onChangeText}
        autoCapitalize={props.autoCapitalize}
      />
    </View>
  );
};

export default IconTextField;
