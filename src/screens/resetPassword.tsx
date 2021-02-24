import * as Yup from 'yup';

import { $mainBlue, $white } from '../utils/colors';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

// @ts-ignore: Weirdness with react-native-dotenv
import { API_URL } from '@env';
import { Formik } from 'formik';
import IconTextField from '../components/shared/IconTextField/container';
import StyledButton from '../components/shared/StyledButton';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
import { exo } from '../utils/api';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { rollbar } from '../utils/rollbar';

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

const ResetPasswordSchema = Yup.object().shape({
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
  password: string;
  password2: string;
}

const ResetPassword = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const postResetPassword = (vals: FormValues) => {
    const { password } = vals;
    exo
      .post(`${API_URL}/user/forgot/${_.get(route.params, 'token', '')}`, {
        password,
      })
      .then(() => {
        navigation.navigate('Login');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password has been reset',
        });
      })
      .catch((err) => {
        rollbar.error(`Reset Password Failed: ${err}`);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Failed to reset password successfully',
        });
      });
  };

  useEffect(() => {
    exo.get(`/user/reset/${_.get(route.params, 'token', '')}`).catch(() => {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Password reset link expired!',
      });
      navigation.goBack();
    });
  });

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../assets/img/picstop-logo.png')}
          style={styles.logo}
        />
        <Formik
          initialValues={{
            password: '',
            password2: '',
          }}
          onSubmit={postResetPassword}
          validationSchema={ResetPasswordSchema}
          initialErrors={{
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
                {errors && <Text>{touched.password && errors.password}</Text>}
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
                    text={'Submit'}
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default ResetPassword;
