import React from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';

export default CustomTextInput = (props) => {

  const { title, onPress } = props;
  const style = props.style?props.style:{};
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: (style.width ? style.width: '100%'),
      height: (style.height ? style.height: 50),
      marginLeft: (style.marginLeft ? style.marginLeft : 0),
      marginRight: (style.marginRight ? style.marginRight : 0),
      marginTop: (style.marginTop ? style.marginTop : 0),
      marginBottom: (style.marginBottom ? style.marginBottom : 0),
      margin: (style.margin ? style.margin : 0),
      borderColor: (style.borderColor? style.borderColor : '#F36190'),
      borderRadius: (style.borderRadius? style.borderRadius : 0),
      borderWidth: (style.borderWidth? style.borderWidth : 0),
      backgroundColor: (style.backgroundColor? style.backgroundColor : '#F36190'),
      backgroundColor: 'pink',
      padding: 10
    },
    icon: {
      padding: 10,
    },
    input: {
      flex: 1,
      fontFamily: (style.fontWeight? style.fontWeight: "Futura-Bold"),
      fontWeight: (style.fontWeight? style.fontWeight: "600"),
      fontSize: (style.fontSize? style.fontSize: 16),
      color: (style.color ? style.color : "white"),
      letterSpacing: 0.53,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
    },
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="User Nickname"
        onChangeText={(searchString) => {console.log(searchString)}}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};
