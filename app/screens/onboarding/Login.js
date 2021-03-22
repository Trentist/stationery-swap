import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import {LargeButton, TextLink, SocialButton } from '../../components/common';

const Login = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Email Address"
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder="Password"
      />
      <View style={styles.buttonGroup}>
        <LargeButton
          title="LOGIN"  
          onPress={()=>navigation.navigate('Main')}
        />
        <TextLink style={styles.forgot}>Forgot Password?</TextLink>
      </View>
      <Text style={styles.loginWith}>or login with</Text>
      <View style={styles.socialCont}>
        <SocialButton style={styles.socialButton} social="google" />
        <SocialButton style={styles.socialButton} social="facebook" />
        <SocialButton style={styles.socialButton} social="twitter" />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Don't have an account? </Text>
        <TextLink style={styles.bottomText} onPress={() => {}}>Create new now!</TextLink>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>By signing up, you are agree with our </Text>
        <TextLink style={styles.bottomText} onPress={() => {}}>Terms & Conditions</TextLink>
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
    marginBottom: 20
  },
  buttonGroup: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }, 
  forgot: {
    fontSize: 14,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10
  },
  loginWith: {
    color: '#9D9D9D',
    fontSize: 12,
    marginTop: 20
  },
  socialCont: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10
  },
  socialButton: {
    marginLeft: 10,
    marginRight: 10
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

export default Login;
