
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';


import Splash from './screens/onboarding/Splash';
import Onboarding from './screens/onboarding/Onboarding';
import Auth from './screens/onboarding/Auth';
import CreateProfile from './screens/onboarding/CreateProfile';

import MainTabBar from './components/pages/MainTabBar';
import Home from './screens/main/Home';
import Category from './screens/main/Category';
import Search from './screens/main/Search';
import ItemPage from './screens/main/ItemPage';
import SellerProfile from './screens/main/SellerProfile';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="User"
      tabBar={props => <MainTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Alarm" component={Category} />
      <Tab.Screen name="Add" component={Category} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="User" component={SellerProfile} />
    </Tab.Navigator>
  );
};

const Root = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Main">
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;