import { Image, StyleSheet, Text, View } from 'react-native';

import { $mainGray } from '../../../utils/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    flexDirection: 'row-reverse',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  logo: {
    height: 30,
    width: 38,
  },
  icon: {
    margin: 5,
  },
});

interface Props {
  title: string;
}

const CustomHeader = (props: Props) => {
  const { title } = props;
  return (
    <View style={styles.header}>
      <Image
        style={styles.logo}
        source={require('../../../../assets/img/picstop-no-text.png')}
      />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconView}>
        <View style={styles.icon} onTouchStart={() => console.log('TO DO')}>
          <FontAwesomeIcon icon={faSearch} size={25} color={$mainGray} />
        </View>
        <View style={styles.icon} onTouchStart={() => console.log('TO DO')}>
          <FontAwesomeIcon icon={faBell} size={25} color={$mainGray} />
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;
