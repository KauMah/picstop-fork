import { $black, $lighterGray, $mainGray, $white } from '../../../utils/colors';
import {
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: $lighterGray,
    borderRadius: 12,
    backgroundColor: $white,
  },
  iconContainer: {
    borderRightWidth: 1,
    borderRightColor: $lighterGray,
  },
  icon: {
    marginTop: 15,
    marginHorizontal: 10,
  },
  button: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingTop: 19,
    paddingBottom: 17,
  },
  value: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 4,
  },
  name: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
  },
  arrow: {
    marginHorizontal: 10,
    marginTop: 2,
  },
});

type Props = {
  text: String;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  disabled?: boolean;
  icon: IconDefinition;
  arrow?: boolean;
  displayValue: string;
};

const IconButton = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false);
  const {
    text,
    style,
    icon,
    disabled = false,
    onPress,
    arrow = false,
    displayValue,
  } = props;
  const disabledButton = disabled ? { opacity: 0.75 } : {};
  const changedStyle = disabled
    ? {
        iconContainer: {
          borderRightColor: $lighterGray,
        },
        view: {
          borderColor: $lighterGray,
        },
      }
    : {};

  return (
    <View style={[styles.view, style, changedStyle.view]}>
      <View style={[styles.iconContainer, changedStyle.iconContainer]}>
        <FontAwesomeIcon
          icon={icon}
          size={30}
          color={$mainGray}
          style={[styles.icon, disabledButton]}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={disabled ? () => {} : onPress}
        disabled={disabled}
        style={[
          {
            ...styles.button,
            borderColor: $mainGray,
          },
          style,
          disabledButton,
        ]}>
        <View style={styles.textContainer}>
          <Text style={{ ...styles.name, color: $mainGray }}>{text}</Text>
          <Text style={{ ...styles.value, color: $black }}>{displayValue}</Text>
        </View>

        {arrow && (
          <FontAwesomeIcon
            icon={faArrowAltCircleRight}
            size={30}
            color={$mainGray}
            style={styles.arrow}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;
