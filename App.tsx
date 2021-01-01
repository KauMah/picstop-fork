import { NativeRouter, Route, Switch } from 'react-router-native';
import { StatusBar, StyleSheet, View } from 'react-native';

import Login from './screens/login';
import React from 'react';
import Welcome from './screens/welcome';

declare const global: { HermesInternal: null | {} };

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
});

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </View>
      </NativeRouter>
    </>
  );
};

export default App;
