import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import assets from '../../assets';

export default SocialButton = (props) => {

  const { onPress } = props;
  const style = props.style?props.style:{};
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: (style.width ? style.width: 50),
      height: (style.height ? style.height: 50),
      borderColor: (style.borderColor? style.borderColor : '#E0E0E0'),
      borderRadius: (style.borderRadius? style.borderRadius : 25),
      borderWidth: (style.borderWidth? style.borderWidth : 1),
      backgroundColor: (style.backgroundColor? style.backgroundColor : 'white'),
      marginLeft: (style.marginLeft ? style.marginLeft : 0),
      marginRight: (style.marginRight ? style.marginRight : 0),
      marginTop: (style.marginTop ? style.marginTop : 0),
      marginBottom: (style.marginBottom ? style.marginBottom : 0),
      margin: (style.margin ? style.margin : 0),
    },
    button: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: '50%',
      height: '50%',
    },
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => { if (onPress) onPress(); }}>
        <Image style={styles.image} source={assets.images.social[props.social]}/>
      </TouchableOpacity>
    </View>
  );
};
