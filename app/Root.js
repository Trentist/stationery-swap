
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Splash from './screens/onboarding/Splash';
import Onboarding from './screens/onboarding/Onboarding';
import Auth from './screens/onboarding/Auth';
import CreateProfile from './screens/onboarding/CreateProfile';
import Test from './screens/onboarding/Test';

import MainDrawer from './components/pages/MainDrawer';
import Home from './screens/main/Home';
import Category from './screens/main/Category';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CreateProfile">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
};

const MainContentNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Category"
      drawerType="slide"
      drawerContent={(props) => <MainDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Category" component={Category} />
    </Drawer.Navigator>
  );
};

const Root = () => {
  return (
    <NavigationContainer>
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