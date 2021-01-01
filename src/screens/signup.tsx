import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';

import IconTextField from '../components/IconTextField/container';
import React from 'react';
import StyledButton from '../components/StyledButton';
import { faLock } from '@fortawesome/free-solid-svg-icons';

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
    marginBottom: 25,
  },
  button: {
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 10,
  },
  fine: {
    fontFamily: 'Kumbh Sans',
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
});

const SignUp = () => {
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
          icon={faEnvelope}
          placeholder={'Email'}
          style={styles.textField}
        />
        <IconTextField
          icon={faLock}
          placeholder={'Password'}
          style={styles.textField}
        />
      </View>
      <View style={styles.button}>
        <StyledButton
          text={'Sign Up'}
          type="blue"
          onPress={() => console.log('hiya')}
        />
      </View>
      <Text style={styles.fine}>
        By registering with PicStop, you confirm that you agree to our Terms of
        Service and Privacy Policy
      </Text>
    </SafeAreaView>
  );
};
export default SignUp;
