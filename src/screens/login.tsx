import * as Yup from 'yup';

import { $mainBlue, $white } from '../utils/colors';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { exo, setToken } from '../utils/api';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';

// @ts-ignore: Weirdness with react-native-dotenv
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../components/shared/CustomModal';
import { Formik } from 'formik';
import IconTextField from '../components/shared/IconTextField/container';
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
    backgroundColor: $white,
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
    width: 200,
    height: 164,
    marginTop: 55,
    marginBottom: 25,
  },
  button: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  forgot: {
    fontFamily: 'Kumbh Sans',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 30,
  },
  blueText: {
    color: $mainBlue,
    fontWeight: 'bold',
  },
  contained: {
    width: '60%',
    padding: 10,
  },
  centered: {
    alignItems: 'center',
  },
  fullWidth: {
    marginVertical: 5,
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
  const [reset, setReset] = useState(false);
  const [email, setEmail] = useState('');
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
        rollbar.error(`Failed to login: ${err}`);
        Toast.show({ type: 'error', position: 'top', text1: 'Login failed!' });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomModal modalVisible={reset} onPressOverlay={() => setReset(false)}>
        <View style={styles.contained}>
          <IconTextField
            icon={faEnvelope}
            placeholder="Email"
            onChangeText={(txt) => setEmail(txt)}
            value={email}
            style={styles.textField}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <View>
            <StyledButton
              type="blue"
              text="Submit"
              style={styles.fullWidth}
              onPress={async () => {
                exo
                  .post('/user/forgot', { email: email })
                  .then((res) => {
                    if (res.status === 200) {
                      Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2:
                          'A link has been sent to your email if it exists',
                      });
                    }
                  })
                  .catch(() => {
                    Toast.show({
                      type: 'error',
                      text1: 'Something failed on our end',
                      text2: 'Our servers may be down, please try again later',
                    });
                  });
                setReset(false);
              }}
            />
          </View>
        </View>
      </CustomModal>
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
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'position' : undefined}>
            <View style={styles.inputs}>
              <View style={styles.centered}>
                <Image
                  source={require('../../assets/img/picstop-logo.png')}
                  style={styles.logo}
                />
              </View>
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
                onSubmitEditing={handleSubmit}
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
                onSubmitEditing={handleSubmit}
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
          </KeyboardAvoidingView>
        )}
      </Formik>
      <Text style={styles.forgot}>
        Forgot your password?
        <Text
          onPress={() => {
            setReset(true);
          }}
          style={styles.blueText}>
          {' '}
          Reset password
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default Login;
