import React,{useState,useEffect} from 'react';
import {View, StyleSheet, Text, TextInput,Button} from 'react-native';
import {LargeButton, TextLink, SocialButton} from '../../components/common';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import {
  GoogleSignin,
  statusCodes,
} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
  

const Login = ({navigation}) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState([]);


  //Google SignIn Method
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      setloggedIn(true);

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    
      if(user)
      {
        setloggedIn(true);
        navigation.navigate('Main')
      }
      
      
      

  
  }
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '583315892753-k3r3uqvo2gepl8sf89me5dkk32cldhn7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  //Google Signout
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert('Your are signed out!'));
      setloggedIn(false);
      // setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };


  //FaceBook Login

  async function FacebookLogin() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  
   function logout()
   {
    
    LoginManager.logOut()
    Alert.alert('logout')
   }


  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} placeholder="Email Address" />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder="Password"
      />
      <View style={styles.buttonGroup}>
        <LargeButton
          title="LOGIN"
          onPress={() => navigation.navigate('Main')}
        />
        <TextLink style={styles.forgot}>Forgot Password?</TextLink>
      </View>
      <Text style={styles.loginWith}>or login with</Text>
      <View style={styles.socialCont}>
        <SocialButton onPress={signIn} style={styles.socialButton} social="google" />
        <SocialButton onPress={FacebookLogin} style={styles.socialButton} social="facebook" />
        <SocialButton style={styles.socialButton} social="twitter" />
                     <Button
                    onPress={signOut}
                    title="LogOut"
                    color="red"></Button>

                    <Button
                    onPress={logout}
                    title="LogOut"
                    color="blue"></Button>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Don't have an account? </Text>
        <TextLink style={styles.bottomText} onPress={() => {}}>
          Create new now!
        </TextLink>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          By signing up, you are agree with our{' '}
        </Text>
        <TextLink style={styles.bottomText} onPress={() => {}}>
          Terms & Conditions
        </TextLink>
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    backgroundColor: 'yellow',
  },
  textInput: {
    height: 50,
    width: '100%',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    paddingHorizontal: 25,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonGroup: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  forgot: {
    fontSize: 14,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  loginWith: {
    color: '#9D9D9D',
    fontSize: 12,
    marginTop: 20,
  },
  socialCont: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  socialButton: {
    marginLeft: 10,
    marginRight: 10,
  },
  bottomContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Login;
