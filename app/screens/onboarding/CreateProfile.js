import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown'
import { ImageButton, SmallButton, CustomModal } from '../../components/common';
import assets from '../../assets';
import * as ImagePicker from 'react-native-image-picker';
import {updateProfileInfo} from "../../firebase/authMethods"

const CreateProfile = ({navigation}) => {
  const [selectedPicture,setSelectedPicture]=useState("")
  const [profileName,setProfileName] = useState('')
  const [location,setLocation] = useState('')
  const [description,setDescription] = useState('')
  const [busyModal, setBusyModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  let data = [{
    value: 'Toronto, Canada',
  }, {
    value: 'Vancouver, Canada',
  }, {
    value: 'New York, US',
  }];

  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 200,
    maxWidth: 200,
  };
  
  const selectImage=()=>{
  ImagePicker.launchImageLibrary(options, (response) => {
    console.log('Response = ', response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      console.log("response:",response)
        setSelectedPicture(response)
    }
    });
  }

  const saveProfile=async()=>{
      setBusyModal(true);
      await updateProfileInfo(selectedPicture,profileName,location,description).then((response)=>{
      setBusyModal(false);
      console.log("get profile information")
      if(response=="added"){
        navigation.reset({
          index:0,
          routes:[{name:'Main'}]
        })
      } else if(response.code !==undefined && response.code!==null){
        setErrorModalText('Unknown error occurred.');
        setErrorModal(true);
      }
    })
  }

  return (
    <View style={styles.container}>

      <ImageButton onPress={()=>navigation.goBack()} style={styles.backButton} source={assets.images.icons.back} />

      <Text style={styles.title}>Create Profile</Text>
      <View style={styles.avatarCont}>
        <TouchableOpacity style={styles.touchable} onPress={selectImage}>
        {selectedPicture=="" ? 
          <Image style={{width: 45, height: 40}} 
            source={assets.images.icons.uploadIcon} 
            />
          :<Image style={{width: 140, height: 140,borderRadius:70}}
            source={{uri: selectedPicture.uri}}
            />
          }
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>Choose your Avatar</Text>
      <TextInput style={[styles.textInput, {height: 50}]} placeholder="Name"
      onChangeText={(text)=>setProfileName(text)} />
      <Dropdown
        label='Location'
        data={data}
        containerStyle={styles.dropdown}
        onChangeText={(text)=>setLocation(text)}
      />
      <TextInput style={[styles.textInput, {height: 120}]} placeholder="About" multiline textAlignVertical="top" 
      onChangeText={(text)=>setDescription(text)}/>
      <SmallButton onPress={()=>{saveProfile()}} style={{width: 100, marginTop: 20}} title="Done"/>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30
  },
  avatarCont: {
    width: 140,
    height: 140,
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 70
  },
  touchable: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  description: {
    fontSize: 16,
    color: '#B1B1B1',
    marginTop: 15
  },
  textInput: {
    borderColor: '#707070',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 14,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  location: {
    borderColor: '#707070',
    borderRadius: 10,
    borderWidth: 1,
  },
  dropdown: {
    width: '100%',
    borderColor: '#707070',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 18,
    marginTop: 20
  }
});

export default CreateProfile;
