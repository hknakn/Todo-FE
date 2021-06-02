import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import CompletedScreen from "../screens/CompletedScreen";
import TaskFormScreen from "../screens/TaskFormScreen";

const HomeStack = createStackNavigator({ Home: HomeScreen, Form: TaskFormScreen });

HomeStack.navigationOptions = {
    tabBarLabel: "Devam Eden",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === "ios"
                    ? `ios-information-circle${focused ? "" : "-outline"}`
                    : "md-information-circle"
            }
        />
    )
};

const CompletedStack = createStackNavigator({ Completed: CompletedScreen });

CompletedStack.navigationOptions = {
    tabBarLabel: "Tamamlanmış",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === "ios" ? "ios-checkmark-circle-outline" : "md-options"
            }
        />
    )
};

const tabNavigator = createBottomTabNavigator({ HomeStack, CompletedStack });

export default tabNavigator;
