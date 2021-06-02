import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import firebase from 'firebase'
import AppNavigator from './navigation/AppNavigator';
import AuthScreen from './screens/AuthScreen';
import configureStore from './store/configureStore';
import { Provider, useSelector } from 'react-redux';

const firebaseConfig = {
  apiKey: 'AIzaSyB9rFMY0pHLzxjxNNbXoAWc6Siux_h51pc',
  authDomain: 'remote-config-test-5da2f.firebaseapp.com',
  databaseURL: 'https://remote-config-test-5da2f.firebaseio.com',
  projectId: 'remote-config-test-5da2f',
  storageBucket: 'remote-config-test-5da2f.appspot.com',
  messagingSenderId: '764032340965',
  appId: '1:764032340965:ios:eda432e84d88f054d2950c',
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
const store = configureStore()


const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
