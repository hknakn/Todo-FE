import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthScreen from '../screens/AuthScreen';

import MainTabNavigator from './MainTabNavigator';

const AppContainer = createAppContainer(
    createSwitchNavigator({
        Auth: AuthScreen,
        Main: MainTabNavigator,
    })
);

export default AppContainer;
