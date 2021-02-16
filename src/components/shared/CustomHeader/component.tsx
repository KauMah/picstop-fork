import { $lighterGray, $mainGray, $tabBarGray } from '../../../utils/colors';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Search from '../../Search';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { snapPoint } from 'react-native-redash';
import { useNavigation } from '@react-navigation/native';

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
  //Search Styles
  searchContainer: {
    width: '100%',
    height: '100%',
    padding: 10,
    paddingTop: 5,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $tabBarGray,
    opacity: 0.6,
    borderRadius: 40,
  },
  nub: {
    backgroundColor: $lighterGray,
    height: 5,
    width: '20%',
    borderRadius: 3,
    marginBottom: 5,
  },
});

interface Props {
  title: string;
  actions?: boolean;
}

const { height } = Dimensions.get('window');

const CustomHeader = (props: Props) => {
  const { title, actions = true } = props;
  const [searching, setSearching] = useState(false);
  const navigation = useNavigation();
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  const searchingWrapper = (s: boolean) => {
    setSearching(s);
    opacity.value = 1;
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: ({ translationY }) => {
      translateY.value = translationY;
      opacity.value = (2 * (height - translationY)) / height;
    },
    onEnd: ({ velocityY }) => {
      const dest = snapPoint(translateY.value, velocityY, [0, height]);
      if (dest === 0) {
        translateY.value = withTiming(0);
        opacity.value = withTiming(1);
      } else {
        translateY.value = withTiming(dest);
        opacity.value = withTiming(0);
        runOnJS(searchingWrapper)(false);
      }
    },
  });

  const searchStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <>
      <Modal visible={searching} transparent animationType={'slide'}>
        <SafeAreaView />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.searchContainer, searchStyle]}>
            <View style={styles.nub} />
            <Search />
          </Animated.View>
        </PanGestureHandler>
      </Modal>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../../../assets/img/picstop-no-text.png')}
        />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconView}>
          {actions && (
            <View
              style={styles.icon}
              onTouchStart={() => setSearching(!searching)}>
              <FontAwesomeIcon icon={faSearch} size={25} color={$mainGray} />
            </View>
          )}
          {actions && (
            <View
              style={styles.icon}
              onTouchStart={() => navigation.navigate('Notifications')}>
              <FontAwesomeIcon icon={faBell} size={25} color={$mainGray} />
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default CustomHeader;
