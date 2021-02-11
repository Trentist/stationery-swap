import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const Template = (props) => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Template</Text>
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
    backgroundColor: 'gray',
  },
  title: {
    fontSize: 30,
    backgroundColor: 'yellow'
  }
});

export default Template;
