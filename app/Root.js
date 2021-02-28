
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Splash from './screens/onboarding/Splash';
import Onboarding from './screens/onboarding/Onboarding';
import Auth from './screens/onboarding/Auth';
import CreateProfile from './screens/onboarding/CreateProfile';
import Test from './screens/onboarding/Test';

import MainTabBar from './components/pages/MainTabBar';
import Home from './screens/main/Home';
import Category from './screens/main/Category';
import Search from './screens/main/Search';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Auth">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <MainTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Alarm" component={Category} />
      <Tab.Screen name="Add" component={Category} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="User" component={Category} />
    </Tab.Navigator>
  );
};

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Onboarding">
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;