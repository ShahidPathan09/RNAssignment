/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { persistor, store } from './src/Redux/Store/store'
import { Provider } from 'react-redux'
import MainNavigator from './src/Navigator/MainNavigator';
import { PersistGate } from 'redux-persist/integration/react'

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
