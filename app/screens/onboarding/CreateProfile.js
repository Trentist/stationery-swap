import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown'
import { ImageButton, SmallButton } from '../../components/common';
import assets from '../../assets';

const CreateProfile = ({navigation}) => {
  let data = [{
    value: 'Toronto, Canada',
  }, {
    value: 'Vancouver, Canada',
  }, {
    value: 'New York, US',
  }];
  return (
    <View style={styles.container}>

      <ImageButton onPress={()=>navigation.goBack()} style={styles.backButton} source={assets.images.icons.back} />

      <Text style={styles.title}>Create Profile</Text>
      <View style={styles.avatarCont}>
        <TouchableOpacity style={styles.touchable}>
          <Image style={{width: 45, height: 40}} source={assets.images.icons.uploadIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>Choose your Avatar</Text>
      <TextInput style={[styles.textInput, {height: 50}]} placeholder="Name" />
      <Dropdown
        label='Location'
        data={data}
        containerStyle={styles.dropdown}
      />
      <TextInput style={[styles.textInput, {height: 120}]} placeholder="About" multiline textAlignVertical="top" />
      <SmallButton onPress={()=>navigation.navigate('Main')} style={{width: 100, marginTop: 20}} title="Done"/>
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
