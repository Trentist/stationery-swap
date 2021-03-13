import React from 'react';
import { View, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import config from '../../config';

const Item = (props) => {
  const style = props.style;

  const onPress = () => {
    if (props.onPress)
      props.onPress();
  }

  return (
    <View style={[styles.container, style]}>
      <Image
        style={styles.image}
        source={props.image}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.content} numberOfLines={1}>{props.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    width: config.avatar_size,
    height: config.avatar_size,
    borderRadius: config.avatar_size/2,
    marginRight: 10
  },
  rightContainer: {
    flex: 1,
    height: config.avatar_size,
    paddingVertical: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  name: {
    fontSize: 16
  },
  content: {
    fontSize: 15,
    color: '#9F9F9F'
  }
});

export default Item;
