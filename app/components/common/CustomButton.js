import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default CustomButton = (props) => {

  const { title, onPress } = props;
  const style = props.style?props.style:{};
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: (style.width ? style.width: '100%'),
      height: (style.height ? style.height: 50),
      borderColor: (style.borderColor? style.borderColor : '#F36190'),
      borderRadius: (style.borderRadius? style.borderRadius : 0),
      borderWidth: (style.borderWidth? style.borderWidth : 0),
      backgroundColor: (style.backgroundColor? style.backgroundColor : '#F36190'),
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
    },
    title: {
      fontFamily: (style.fontWeight? style.fontWeight: "Futura-Bold"),
      fontWeight: (style.fontWeight? style.fontWeight: "600"),
      fontSize: (style.fontSize? style.fontSize: 16),
      color: (style.color ? style.color : "white"),
      letterSpacing: 0.53,
      textAlign: "center",
    },
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => { if (onPress) onPress(); }} activeOpacity={0.7}>
        <Text style={styles.title}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
