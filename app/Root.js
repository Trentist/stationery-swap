
import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { connect } from 'react-redux';

import config from './config';

import Splash from './screens/onboarding/Splash';
import Introduction from './screens/onboarding/Introduction';
import Auth from './screens/onboarding/Auth';
import CreateProfile from './screens/onboarding/CreateProfile';

import MainTabBar from './components/pages/MainTabBar';
import Home from './screens/main/Home';
import Category from './screens/main/Category';
import Search from './screens/main/Search';
import ItemPage from './screens/main/ItemPage';
import SellerProfile from './screens/main/SellerProfile';
import NewListing from './screens/main/NewListing';
import Messages from './screens/main/Messages';
import Chatbox from './screens/main/Chatbox';
import Activity from './screens/main/Activity';
import EditProfile from './screens/main/EditProfile';

import auth from '@react-native-firebase/auth';

import { setUser } from './redux/actions';

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
      initialRouteName="Introduction">
      <Stack.Screen name="Introduction" component={Introduction} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <MainTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Add" component={NewListing} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="User" component={EditProfile} />
    </Tab.Navigator>
  );
};

const RootNavigatorComponent = (props) => {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    console.log("user in the route:",user);
    props.setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Onboarding">
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const RootNavigator = connect(mapStateToProps, { setUser })(RootNavigatorComponent);

const Root = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {setLoading(false)}, config.SPLASH_DELAY);
  }, []);

  if (loading)
    return <Splash/>;
  else
    return <RootNavigator/>;
}

const mapStateToProps = (state) => {
  const { user } = state.Auth;
  return { user };
};

//Stack for HomeTab

const StackH = createStackNavigator();
const HomeStack = () => {
  return (
    <StackH.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Introduction">
      <StackH.Screen name="Home" component={Home} />
      <StackH.Screen name="Category" component={Category} />
      <StackH.Screen name="ItemPage" component={ItemPage} />
      <StackH.Screen name="sellerprofile" component={SellerProfile} />
     
    </StackH.Navigator>
  );
};

//Stack for Seeler Profile Tab for chatting
const StackE = createStackNavigator();
const ChatStack = () => {
  return (
    <StackC.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Introduction">
      <StackC.Screen name="Editprofile" component={EditProfile} />
      
     
    </StackC.Navigator>
  );
};



export default Root;