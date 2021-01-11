import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import StyledButton from '../components/shared/StyledButton';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
  },
  logo: {
    height: 164,
    width: 200,
    marginTop: 20,
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
    minHeight: '40%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    width: '50%',
  },
  button: {
    paddingHorizontal: 5,
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
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require('../../assets/img/picstop-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Your journey starts here</Text>
        <Text style={styles.subText}>
          Start adding locations today! Lets just add some more text though
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
              onPress={() => navigation.navigate('Sign Up')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
