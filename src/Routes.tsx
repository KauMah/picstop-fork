import { $mainBlue, $mainGray, $tabBarGray } from './utils/colors';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CreatePost from './screens/createPost';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Feed from './screens/feed';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Likes from './screens/likes';
import Loading from './screens/loading';
import Location from './screens/location';
import Login from './screens/login';
import MapView from './screens/map';
import { NavigationContainer } from '@react-navigation/native';
import Notifications from './screens/notifications';
import Profile from './screens/profile';
import Settings from './screens/settings';
import SignUp from './screens/signup';
import { StatusBar } from 'react-native';
import Welcome from './screens/welcome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { login } from './redux/actions';
import { reduxState } from './redux/actionTypes';
import { setToken } from './utils/api';

const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

interface RouteProps {
  token: string;
}

const Routes = (props: RouteProps) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const LoadedRoutes = () => {
    return props.token !== '' ? (
      <AuthenticatedRoutes />
    ) : (
      <UnauthenticatedRoutes />
    );
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          dispatch(login(storedToken));
        }
      } catch (e) {
        return false;
      }
    };

    if (!loaded) {
      checkAuth().then(() => {
        setLoaded(true);
      });
    }
  }, [loaded, dispatch]);

  return loaded ? <LoadedRoutes /> : <Loading />;
};

const MainRoutes = () => {
  return (
    <Tabs.Navigator
      initialRouteName={'Home'}
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: $tabBarGray },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case 'Home':
              return (
                <Ionicon
                  name={'home-outline'}
                  size={30}
                  color={focused ? $mainBlue : $mainGray}
                />
              );
            case 'Map':
              return (
                <Feather
                  name={'map-pin'}
                  size={30}
                  color={focused ? $mainBlue : $mainGray}
                />
              );
            case 'Post':
              return (
                <Feather
                  name={'plus-circle'}
                  size={30}
                  color={focused ? $mainBlue : $mainGray}
                />
              );
            case 'Profile':
              return (
                <Ionicon
                  name={'md-person-circle-outline'}
                  size={35}
                  color={focused ? $mainBlue : $mainGray}
                />
              );
            case 'Settings':
              return (
                <EvilIcon
                  name={'gear'}
                  size={40}
                  color={focused ? $mainBlue : $mainGray}
                />
              );
          }
        },
      })}>
      <Tabs.Screen name="Home" component={Feed} />
      <Tabs.Screen name="Map" component={MapView} />
      <Tabs.Screen
        name="Post"
        component={CreatePost}
        options={{ tabBarVisible: false }}
      />
      <Tabs.Screen name="Profile" component={Profile} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
};

const AuthenticatedRoutes = () => {
  const config = {
    screens: {
      User: '/user/:username?',
      Location: '/locations/:locationId',
      Likes: '/likes/:postId',
      Comments: '/comments/:postId',
    },
  };
  const linking = {
    prefixes: ['https://picstopapp.com', 'picstop://'],
    config,
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer linking={linking}>
        <MainStack.Navigator initialRouteName={'Home'}>
          <MainStack.Screen
            name="Home"
            component={MainRoutes}
            options={{ headerShown: false }}
          />
          <MainStack.Screen name="Likes" component={Likes} />
          <MainStack.Screen name="Comments" component={Loading} />
          <MainStack.Screen name="Report" component={Loading} />
          <MainStack.Screen
            name="Notifications"
            component={Notifications}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="User"
            component={Profile}
            options={{ headerShown: false }}
          />
          <MainStack.Screen name="Location" component={Location} />
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
};

const UnauthenticatedRoutes = () => {
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

const mapStateToProps = (state: reduxState) => {
  const { token } = state;
  return { token };
};

export default connect(mapStateToProps)(Routes);
