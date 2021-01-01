import React, { useState } from 'react';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import {
  black,
  lighterGray,
  mainBlue,
  mainGray,
  white,
} from '../../utils/colors';

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

interface Props {
  placeholder?: string;
  style?: ViewStyle;
  icon: IconDefinition;
}

const IconTextField = (props: Props) => {
  const [error, setError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { placeholder, style, icon } = props;
  const focus = isFocused
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
    <View style={[styles.view, style, focus.view]}>
      <View style={[styles.iconContainer, focus.iconContainer]}>
        <FontAwesomeIcon
          icon={icon}
          size={30}
          color={isFocused ? mainBlue : mainGray}
          style={styles.icon}
        />
      </View>
      <TextInput
        style={styles.text}
        placeholder={placeholder}
        placeholderTextColor={mainGray}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default IconTextField;
