import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import StyledButton from '../components/StyledButton';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    marginTop: 30,
    paddingBottom: 10,
  },
  subText: {
    fontSize: 18,
    lineHeight: 23,
    fontFamily: 'Kumbh Sans',
    fontWeight: '100',
    paddingHorizontal: 40,
  },
  carousel: {
    height: 380,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 5,
  },
});

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const Welcome = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/img/picstop-logo.png')} />
      <Text style={styles.headerText}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit
      </Text>
      <Text style={styles.subText}>
        Title and subtitle can be whatever you think explains the app in a few
        words.
      </Text>
      <View style={styles.carousel} />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <StyledButton
            text={'Sign in'}
            type={'green'}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
        <View style={styles.button}>
          <StyledButton
            text={'Sign Up'}
            type={'blue'}
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
