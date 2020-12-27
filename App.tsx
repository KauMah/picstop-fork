import {NativeRouter, Route, Switch} from 'react-router-native';
import {StatusBar, StyleSheet, View} from 'react-native';

import React from 'react';
import Welcome from './screens/welcome';

declare const global: {HermesInternal: null | {}};

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
            <Route route="/" component={Welcome} />
          </Switch>
        </View>
      </NativeRouter>
    </>
  );
};

export default App;
