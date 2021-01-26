import * as Yup from 'yup';

import { Image, SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';

// @ts-ignore: Weirdness with react-native-dotenv
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import IconTextField from '../components/shared/IconTextField/container';
import React from 'react';
import StyledButton from '../components/shared/StyledButton';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { login } from '../redux/actions';
import { setToken } from '../utils/api';
import { useDispatch } from 'react-redux';

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
    height: 164,
    width: 200,
    marginTop: 139,
    marginBottom: 25,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
  fine: {
    fontFamily: 'Kumbh Sans',
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 20,
    lineHeight: 20,
  },
});

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username too Short')
    .max(50, 'Username too long')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]*$/,
      'Password must contain at least 6 characters, one uppercase, and one number ',
    )
    .required('Password is required'),
});

interface FormValues {
  email: string;
  username: string;
  password: string;
  password2: string;
}

const SignUp = () => {
  const dispatch = useDispatch();
  const postSignUp = (vals: FormValues) => {
    const { email, username, password, password2 } = vals;
    fetch(`${API_URL}/user/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password, password2 }),
    })
      .then((response) => {
        if (response.status === 201) {
          postSignIn(vals);
        }
      })
      .catch((err) => {
        console.log('Signup Failed', err);
      });
  };
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
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((resBody) => {
        if (resBody && resBody.message) {
          AsyncStorage.setItem('token', resBody.message);
          setToken(resBody.message);
          dispatch(login(resBody.message));
        }
      })
      .catch((err) => {
        console.log('Login Failed', err);
      });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : undefined}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../assets/img/picstop-logo.png')}
          style={styles.logo}
        />
        <Formik
          initialValues={{ username: '', email: '', password: '', password2: '' }}
          onSubmit={postSignUp}
          validationSchema={SignUpSchema}
          initialErrors={{
            username: 'err',
            email: 'err',
            password: 'err',
            password2: 'err',
          }}
          validateOnBlur>
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
              {errors && (
                <Text>
                  {touched.username && errors.username}{' '}
                  {touched.email && errors.email}{' '}
                  {touched.password && errors.password}
                </Text>
              )}
              <IconTextField
                icon={faUser}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholder={'Username'}
                style={styles.textField}
                value={values.username}
                autoCapitalize={'none'}
                invalid={
                  touched.username ? (errors.username ? true : false) : false
                }
              />
              <IconTextField
                icon={faEnvelope}
                placeholder={'Email'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.textField}
                autoCapitalize={'none'}
                invalid={touched.email ? (errors.email ? true : false) : false}
              />
              <IconTextField
                icon={faLock}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder={'Password'}
                value={values.password}
                secureTextEntry
                style={styles.textField}
                invalid={
                  touched.password ? (errors.password ? true : false) : false
                }
              />
              <IconTextField
                icon={faLock}
                onChangeText={handleChange('password2')}
                onBlur={handleBlur('password2')}
                placeholder={'Reenter Password'}
                value={values.password2}
                secureTextEntry
                style={styles.textField}
                invalid={
                  touched.password2 ? (errors.password2 ? true : false) : false
                }
              />
              <View style={styles.button}>
                <StyledButton
                  text={'Sign Up'}
                  type="blue"
                  onPress={handleSubmit}
                  disabled={!touched || !isValid}
                />
              </View>
            </View>
          )}
        </Formik>

        <Text style={styles.fine}>
          By registering with PicStop, you confirm that you agree to our Terms of
          Service and Privacy Policy
        </Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
