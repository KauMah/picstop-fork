import * as Yup from 'yup';

import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';

import { Formik } from 'formik';
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
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character',
    )
    .required('Password is required'),
});

const SignUp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/img/picstop-logo.png')}
        style={styles.logo}
      />
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={(values) => console.log(values)}
        validationSchema={SignUpSchema}
        validateOnBlur>
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.inputs}>
            {errors && <Text>{errors.username}</Text>}
            <IconTextField
              icon={faUser}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              placeholder={'Username'}
              style={styles.textField}
              value={values.username}
              autoCapitalize={'none'}
            />
            <IconTextField
              icon={faEnvelope}
              placeholder={'Email'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.textField}
              autoCapitalize={'none'}
            />
            <IconTextField
              icon={faLock}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder={'Password'}
              value={values.password}
              secureTextEntry
              style={styles.textField}
            />
            <View style={styles.button}>
              <StyledButton
                text={'Sign Up'}
                type="blue"
                onPress={handleSubmit}
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
  );
};
export default SignUp;
