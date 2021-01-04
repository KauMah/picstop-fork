import * as Yup from 'yup';

import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Formik } from 'formik';
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
    width: '100%',
    marginTop: 10,
  },
  forgot: {
    fontFamily: 'Kumbh Sans',
    fontSize: 16,
    marginTop: 20,
  },
});

const LogInSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/img/picstop-logo.png')}
        style={styles.logo}
      />
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => console.log(values)}
        initialErrors={{ username: 'err', password: 'err' }}
        validationSchema={LogInSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View style={styles.inputs}>
            <IconTextField
              icon={faUser}
              placeholder={'Username'}
              value={values.username}
              onBlur={handleBlur('username')}
              onChangeText={handleChange('username')}
              style={styles.textField}
              autoCapitalize={'none'}
              invalid={
                touched.username ? (errors.username ? true : false) : false
              }
            />
            <IconTextField
              icon={faLock}
              placeholder={'Password'}
              value={values.password}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              style={styles.textField}
              invalid={
                touched.password ? (errors.password ? true : false) : false
              }
              secureTextEntry
            />
            <View style={styles.button}>
              <StyledButton
                text={'Sign In'}
                type="green"
                onPress={handleSubmit}
                disabled={!touched || !isValid}
              />
            </View>
          </View>
        )}
      </Formik>

      <Text style={styles.forgot}>Forgot your password? Reset password</Text>
    </SafeAreaView>
  );
};

export default Login;
