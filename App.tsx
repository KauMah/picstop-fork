import { Provider } from 'react-redux';
import React from 'react';
import Routes from './src/Routes';
import Toast from 'react-native-toast-message';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
};
export default App;
