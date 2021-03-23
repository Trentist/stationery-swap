import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';

import assets from '../../assets';

const Splash = (props) => {
  return (
    <View style={styles.container}>
      <Image source={assets.images.splash} style={styles.backgroundImage} />
      <Text style={styles.logo}>statioinery{'\n'}swap</Text>
    </View>
  );
};

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  logo: {
    position: 'absolute',
    top: '25%',
    fontFamily: 'SweetApricot',
    fontSize: 50,
    textAlign: 'center',
    color: 'black'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  }
};

export default Splash;
