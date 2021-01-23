import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

// @ts-ignore: Weirdness with react-native-dotenv
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/shared/CustomHeader';
import React from 'react';
import StyledButton from '../components/shared/StyledButton';
import { logout } from '../redux/actions';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#FFF',
    height: '100%',
  },
  imageWrapper: {
    marginTop: 20,
    marginBottom: 10,
  },
  image: {
    width: 140,
    height: 115,
  },
  button: {
    paddingHorizontal: 20,
    width: '100%',
  },
});

const Settings = () => {
  const dispatch = useDispatch();
  const postLogout = () => {
    fetch(`${API_URL}/user/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        dispatch(logout());
        AsyncStorage.removeItem('token');
      })
      .catch((err) => {
        dispatch(logout());
        AsyncStorage.removeItem('token');
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={'Settings'} />
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/img/picstop-logo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.button}>
        <StyledButton text={'Sign Out'} type={'blue'} onPress={postLogout} />
      </View>
    </SafeAreaView>
  );
};
export default Settings;
