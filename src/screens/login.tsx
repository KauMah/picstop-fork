import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import IconTextField from '../components/IconTextField/container';
import React from 'react';
import StyledButton from '../components/StyledButton';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#FFF',
    height: '100%',
  },
  inputs: {
    paddingHorizontal: 20,
    width: '100%',
  },
  textField: {
    marginVertical: 5,
  },
  logo: {
    width: 200,
    height: 164,
    marginTop: 139,
    marginBottom: 25,
  },
  button: {
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 10,
  },
  forgot: {
    fontFamily: 'Kumbh Sans',
    fontSize: 16,
    marginTop: 20,
  },
});

const Login = () => {
  const logIn = () => {
    console.log('hey');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/img/picstop-logo.png')}
        style={styles.logo}
      />
      <View style={styles.inputs}>
        <IconTextField
          icon={faUser}
          placeholder={'Username'}
          style={styles.textField}
        />
        <IconTextField
          icon={faLock}
          placeholder={'Password'}
          style={styles.textField}
          secureTextEntry
        />
      </View>
      <View style={styles.button}>
        <StyledButton text={'Sign In'} type="green" onPress={logIn} />
      </View>
      <Text style={styles.forgot}>Forgot your password? Reset password</Text>
    </SafeAreaView>
  );
};

export default Login;
