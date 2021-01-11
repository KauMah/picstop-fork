import { Provider } from 'react-redux';
import React from 'react';
import Routes from './src/Routes';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
export default App;
