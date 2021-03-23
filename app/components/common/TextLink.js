import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import config from '../../config';

export default TextLink = (props) => {

  const { onPress } = props;
  const style = props.style?props.style:{};
  const styles = {
    text: {
      fontWeight: (style.fontWeight? style.fontWeight: "600"),
      fontSize: (style.fontSize? style.fontSize: 12),
      color: (style.color ? style.color : config.themeColor),
    },
  };
  
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => { if (onPress) onPress(); }} style={style}>
      <Text style={styles.text}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};
