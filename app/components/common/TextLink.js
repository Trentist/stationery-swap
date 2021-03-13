import React from 'react';
import { Text } from 'react-native';

export default TextLink = (props) => {

  const { onPress } = props;
  const style = props.style?props.style:{};
  const styles = {
    text: {
      fontWeight: (style.fontWeight? style.fontWeight: "600"),
      fontSize: (style.fontSize? style.fontSize: 12),
      color: (style.color ? style.color : "#F36190")
    },
  };
  styles.text = {...style, ...styles.text};
  return (
    <Text style={styles.text} onPress={() => { if (onPress) onPress(); }}>
      {props.children}
    </Text>
  );
};
