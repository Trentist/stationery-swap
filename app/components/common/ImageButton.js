import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import assets from '../../assets';

export default ImageButton = (props) => {

  const { onPress } = props;
  const style = props.style?props.style:{};
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      borderColor: (style.borderColor? style.borderColor : 'transparent'),
      borderRadius: (style.borderRadius? style.borderRadius : 0),
      borderWidth: (style.borderWidth? style.borderWidth : 0),
      backgroundColor: (style.backgroundColor? style.backgroundColor : 'transparent'),
      marginLeft: (style.marginLeft ? style.marginLeft : 0),
      marginRight: (style.marginRight ? style.marginRight : 0),
      marginTop: (style.marginTop ? style.marginTop : 0),
      marginBottom: (style.marginBottom ? style.marginBottom : 0),
      margin: (style.margin ? style.margin : 0),
      alignSelf: (style.alignSelf ? style.alignSelf : 'auto'),
    },
    button: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
    },
  };
  if (style.width) styles.image['width'] = style.width;
  if (style.height) styles.image['height'] = style.height;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => { if (onPress) onPress(); }}>
        <Image style={styles.image} source={props.source}/>
      </TouchableOpacity>
    </View>
  );
};
