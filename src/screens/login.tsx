import * as Yup from 'yup';

import { Image, SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';

import { $white } from '../utils/colors';
// @ts-ignore: Weirdness with react-native-dotenv
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import IconTextField from '../components/shared/IconTextField/container';
import React from 'react';
import StyledButton from '../components/shared/StyledButton';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { login } from '../redux/actions';
import { setToken } from '../utils/api';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: $white,
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

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const postSignIn = (vals: FormValues) => {
    const { username, password } = vals;
    fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((responseBody) => {
        AsyncStorage.setItem('token', responseBody.message);
        setToken(responseBody.message);
        dispatch(login(responseBody.message));
      })
      .catch((err) => {
        console.log('Login Failed', err);
      });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : undefined} >
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../assets/img/picstop-logo.png')}
          style={styles.logo}
        />
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={postSignIn}
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
    </KeyboardAvoidingView>
  );
};

export default Login;
