import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import React, { useState } from 'react';

import CustomModal from '../components/shared/CustomModal';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import StyledButton from '../components/shared/StyledButton';
import { setApiUrl } from '../utils/api';

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
  input: {
    margin: 10,
    borderWidth: 1,
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
  const [selecting, setSelecting] = useState(false);
  const [url, setUrl] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CustomModal
          modalVisible={selecting}
          onPressOverlay={() => {
            setSelecting(false);
          }}>
          <TextInput
            style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'url'}
            value={url}
            onChangeText={(u) => setUrl(u)}
          />
          <View>
            <StyledButton
              type="blue"
              text="choose"
              small
              onPress={() => {
                console.log('I ran and didnt just close');
                setSelecting(false);
                setApiUrl(url);
              }}
            />
            <StyledButton
              type="red"
              text="close"
              small
              onPress={() => {
                setSelecting(false);
              }}
            />
          </View>
        </CustomModal>
        <LongPressGestureHandler
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              setSelecting(true);
            }
          }}>
          <Image
            source={require('../../assets/img/picstop-logo.png')}
            style={styles.logo}
          />
        </LongPressGestureHandler>
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
