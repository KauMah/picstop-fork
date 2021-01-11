import { Image, StyleSheet, Text, View } from 'react-native';
import { mainGray, tabBarGray } from '../../../utils/colors';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    paddingHorizontal: 20,
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

const FeedHeader = () => {
  return (
    <View style={styles.header}>
      <Image
        style={styles.logo}
        source={require('../../../../assets/img/picstop-no-text.png')}
      />
      <Text style={styles.title}>Home</Text>
      <View style={styles.iconView}>
        <View style={styles.icon} onTouchStart={() => console.log('TO DO')}>
          <FontAwesomeIcon icon={faSearch} size={25} color={mainGray} />
        </View>
        <View style={styles.icon} onTouchStart={() => console.log('TO DO')}>
          <FontAwesomeIcon icon={faBell} size={25} color={mainGray} />
        </View>
      </View>
    </View>
  );
};

export default FeedHeader;
