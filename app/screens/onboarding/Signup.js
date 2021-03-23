import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Button,
} from 'react-native';
import {LargeButton, TextLink, CustomModal} from '../../components/common';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as yup from 'yup';
import {signUp} from "../../firebase/authMethods"

const signupValidationSchema = yup.object().shape({
  name: yup.string().required('Full name is Required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords doesn't match"),
});

const Signup = ({navigation}) => {
  const [error, setError] = useState({});
  const [busyModal, setBusyModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const onSignUp = async(values) => {
    const {name, email, password} = values;

    setBusyModal(true);
    await signUp(email, password,name)
      .then((response) => {
        setBusyModal(false);
        if(response=="added"){
          navigation.reset({
            index:0,
            routes:[{name:'CreateProfile'}]
          })
        } else if (response.code === 'auth/email-already-in-use') {
          setErrorModalText('That email address is already in use!');
          setErrorModal(true);
      
        } else if (response.code === 'auth/invalid-email') {
          setErrorModalText('That email address is invalid!');
          setErrorModal(true);
        
        } else if(response.code !==undefined && response.code!==null){
          setErrorModalText('Unknown error occurred.');
          setErrorModal(true);
        }
      });
  };

  const onSignIn = () => {
    if (props.setTab) props.setTab(0);
  };

  return (
    <KeyboardAwareScrollView style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            name: 'Intel',
            email: 'intelmin0915@gmail.com',
            password: '123456',
            confirm: '123456',
          }}
          validationSchema={signupValidationSchema}
          onSubmit={onSignUp}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <TextInput
                style={styles.textInput}
                placeholder="Full Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <Text style={styles.error}>{errors.name}</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              <Text style={styles.error}>{errors.email}</Text>
              <TextInput
                style={styles.textInput}
                secureTextEntry
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <Text style={styles.error}>{errors.password}</Text>
              <TextInput
                style={styles.textInput}
                secureTextEntry
                placeholder="Confirm Password"
                onChangeText={handleChange('confirm')}
                onBlur={handleBlur('confirm')}
                value={values.confirm}
              />
              <Text style={styles.error}>{errors.confirm}</Text>
              <View style={styles.buttonGroup}>
                <LargeButton title="SIGN UP" onPress={handleSubmit} />
              </View>
              <View style={styles.bottomContainer}>
                <Text style={styles.bottomText}>Already have an account? </Text>
                <TextLink style={styles.bottomText} onPress={onSignIn}>
                  Sign in
                </TextLink>
              </View>
            </>
          )}
        </Formik>
      </View>
      <CustomModal
        show={busyModal}
        onClose={() => setBusyModal(false)}
        busy={true}
        backPress={true}
        text="Please wait..."
      />
      <CustomModal
        show={errorModal}
        onClose={() => setErrorModal(false)}
        backPress={true}
        text={errorModalText}
        okbtn={true}
      />
    </KeyboardAwareScrollView>
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
  error: {
    fontSize: 12,
    color: 'red',
    height: 15,
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 5,
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
    marginTop: 10,
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
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  modalBody: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Signup;
