import * as Yup from 'yup';

import { $mainBlue, $white } from '../utils/colors';
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { exo, setToken } from '../utils/api';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';

// @ts-ignore: Weirdness with react-native-dotenv
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import IconTextField from '../components/shared/IconTextField/container';
import React from 'react';
import StyledButton from '../components/shared/StyledButton';
import Toast from 'react-native-toast-message';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { login } from '../redux/actions';
import { rollbar } from '../utils/rollbar';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#FFF',
    height: '100%',
  },
  inputs: {
    paddingHorizontal: 40,
    width: '100%',
    backgroundColor: $white,
  },
  textField: {
    marginVertical: 5,
  },
  logo: {
    height: 164,
    width: 200,
    marginTop: 20,
    marginBottom: 25,
    alignSelf: 'center',
  },
  button: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  fine: {
    fontFamily: 'Kumbh Sans',
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 20,
    lineHeight: 20,
    marginBottom: 30,
  },

  blueText: {
    color: $mainBlue,
    fontWeight: 'bold',
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

  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Confirm Password is required'),
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
    exo
      .post('/user/signup', { email, username, password, password2 })
      .then((response) => {
        if (response.status === 201) {
          postSignIn(vals);
        }
      })
      .catch((err) => {
        rollbar.error(`Signup Failed: ${err}`);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Failed to Sign up successfully',
        });
      });
  };
  const postSignIn = (vals: FormValues) => {
    const { username, password } = vals;
    exo
      .post('/user/login', { username, password })
      .then((response) => {
        AsyncStorage.setItem('token', response.data.message);
        setToken(response.data.message);
        dispatch(login(response.data.message));
      })
      .catch((err) => {
        rollbar.error(`Failed to login: ${err}`);
        Toast.show({ type: 'error', position: 'top', text1: 'Login failed!' });
      });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../assets/img/picstop-logo.png')}
          style={styles.logo}
        />
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            password2: '',
          }}
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
            <KeyboardAvoidingView
              style={styles.container}
              behavior={Platform.OS === 'ios' ? 'position' : undefined}>
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
                  onSubmitEditing={handleSubmit}
                />
                <IconTextField
                  icon={faEnvelope}
                  placeholder={'Email'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.textField}
                  autoCapitalize={'none'}
                  keyboardType="email-address"
                  invalid={
                    touched.email ? (errors.email ? true : false) : false
                  }
                  onSubmitEditing={handleSubmit}
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
                  onSubmitEditing={handleSubmit}
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
                    touched.password2
                      ? errors.password2
                        ? true
                        : false
                      : false
                  }
                  onSubmitEditing={handleSubmit}
                />
                <View style={styles.button}>
                  <StyledButton
                    text={'Sign Up'}
                    type="blue"
                    onPress={handleSubmit}
                    disabled={!touched || !isValid}
                    style={styles.button}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          )}
        </Formik>
        <Text style={styles.fine}>
          By registering with PicStop, you confirm that you agree to our{' '}
          <Text
            style={styles.blueText}
            onPress={() => {
              Linking.openURL('http://google.com').catch((err) =>
                console.error(err),
              );
            }}>
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text
            style={styles.blueText}
            onPress={() => {
              Linking.openURL('http://google.com').catch((err) =>
                console.error(err),
              );
            }}>
            Privacy Policy
          </Text>
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
