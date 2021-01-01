import Login from './screens/login';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import SignUp from './screens/signup';
import { StatusBar } from 'react-native';
import Welcome from './screens/welcome';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Welcome'} headerMode="float">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Sign Up" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
