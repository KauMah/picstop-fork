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
  image: {
    marginTop: 139,
  },
  forgot: {
    fontFamily: 'Kumbh Sans',
    fontSize: 16,
    marginTop: 20,
  },
});

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/img/picstop-logo.png')}
        style={styles.image}
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
        />
      </View>
      <StyledButton
        text={'Sign in'}
        type="green"
        onPress={() => console.log('hey')}
      />
      <Text style={styles.forgot}>Forgot your password? Reset password</Text>
    </SafeAreaView>
  );
};
export default Login;
