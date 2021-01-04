import React, { useEffect, useState } from 'react';
import { faCoffee, faHome } from '@fortawesome/free-solid-svg-icons';
import { mainBlue, mainGray, tabBarGray } from './utils/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Loading from './screens/loading';
import Login from './screens/login';
import MapView from './screens/map';
import { NavigationContainer } from '@react-navigation/native';
import SignUp from './screens/signup';
import { StatusBar } from 'react-native';
import Welcome from './screens/welcome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const AuthContext = React.createContext('');

const Routes = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState('');

  const LoadedRoutes = () => {
    return signedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          return storedToken;
        }
      } catch (e) {
        return false;
      }
    };

    if (!loaded) {
      checkAuth().then((result) => {
        if (result) {
          setToken(result);
          setSignedIn(true);
        } else {
          setSignedIn(false);
        }
        setLoaded(true);
      });
    }
  }, [loaded]);

  return (
    <AuthContext.Provider value={token}>
      {loaded ? <LoadedRoutes /> : <Loading />}
    </AuthContext.Provider>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          showLabel: false,
          style: { backgroundColor: tabBarGray },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let icon;
            switch (route.name) {
              case 'Home':
                icon = faHome;
                break;
              default:
                icon = faCoffee;
            }

            return (
              <FontAwesomeIcon
                icon={icon}
                size={30}
                color={focused ? mainBlue : mainGray}
              />
            );
          },
        })}>
        <Tabs.Screen name="Home" component={MapView} />
        <Tabs.Screen name="Other" component={Loading} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

const UnauthenticatedRoutes = () => {
  return (
    <AuthContext.Provider value="">
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
    </AuthContext.Provider>
  );
};

export default Routes;
