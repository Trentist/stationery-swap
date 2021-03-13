import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import {LargeButton, TextLink } from '../../components/common';

const Signup = (props) => {
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Full Name"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder="Password"
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder="Confirm Password"
      />
      <View style={styles.buttonGroup}>
        <LargeButton
          title="SIGN UP"          
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Already have an account? </Text>
        <TextLink style={styles.bottomText} onPress={() => {}}>Sign in</TextLink>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 30,
    paddingBottom: 20
  },
  title: {
    fontSize: 30,
    backgroundColor: 'yellow'
  },
  textInput: {
    height: 50,
    width: '100%',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    paddingHorizontal: 25,
    fontSize: 16,
  },
  buttonGroup: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }, 
  bottomContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 13
  }
});

export default Signup;
