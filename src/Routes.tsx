import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import {
  faCoffee,
  faCog,
  faHome,
  faMapMarkerAlt,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { mainBlue, mainGray, tabBarGray } from './utils/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Feed from './screens/feed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Loading from './screens/loading';
import Login from './screens/login';
import MapView from './screens/map';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './screens/profile';
import Settings from './screens/settings';
import SignUp from './screens/signup';
import Welcome from './screens/welcome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { login } from './redux/actions';
import { reduxState } from './redux/actionTypes';
import { setToken } from './utils/api';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const styles = StyleSheet.create({
  tab: {
    marginTop: 10,
  },
});

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
      console.log('running');
      checkAuth().then(() => {
        setLoaded(true);
      });
    }
  }, [loaded, dispatch]);

  return loaded ? <LoadedRoutes /> : <Loading />;
};

const AuthenticatedRoutes = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
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
                case 'Map':
                  icon = faMapMarkerAlt;
                  break;
                case 'Post':
                  icon = faPlusCircle;
                  break;
                case 'Profile':
                  icon = faUserCircle;
                  break;
                case 'Settings':
                  icon = faCog;
                  break;
                default:
                  icon = faCoffee;
              }

              return (
                <FontAwesomeIcon
                  style={styles.tab}
                  icon={icon}
                  size={30}
                  color={focused ? mainBlue : mainGray}
                />
              );
            },
          })}>
          <Tabs.Screen name="Home" component={Feed} />
          <Tabs.Screen name="Map" component={MapView} />
          <Tabs.Screen name="Post" component={Loading} />
          <Tabs.Screen name="Profile" component={Profile} />
          <Tabs.Screen name="Settings" component={Settings} />
        </Tabs.Navigator>
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
