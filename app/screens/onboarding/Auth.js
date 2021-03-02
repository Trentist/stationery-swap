import React, {useState} from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TabView, SceneMap, TabBar  } from 'react-native-tab-view';
import assets from '../../assets';
import Login from './Login';
import Signup from './Signup';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#F36190' }}
    style={styles.tabBar}
    labelStyle={styles.tabLabel}
    pressColor="#CCCCCC"
  />
);

const Auth = (props) => {
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'login', title: 'Login' },
    { key: 'signup', title: 'Signup' },
  ]);
  const renderScene = SceneMap({
    login: Login,
    signup: Signup,
  });

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={assets.images.app_text_logo} />
      <View style={styles.textCont}>
        <Text style={styles.title}>Discover new stationery and crafts to trade and buy</Text>
      </View>
      <TabView
        style={styles.tabView}
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 40,
    marginBottom: 5
  },
  textCont: {
    width: 220,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'center',
    color: '#1A1A1A'
  },
  tabView: {
    flex: 1,
    width: '100%'
  },
  scene: {
    flex: 1
  },
  tabBar: {
    backgroundColor: 'white', 
    borderBottomColor: '#FFD0FF',
    borderBottomWidth: 2,
  },
  tabLabel: {
    color: '#1D2226', 
    fontFamily: 'Futura-Bold', 
    fontSize: 16, 
    fontWeight: 'bold'
  }
});

export default Auth;
