import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TwoColumnsView ,CustomModal} from '../../components/common';
import Item from '../../components/pages/Item';
import assets from '../../assets';
import config from '../../config';
import {getUserInfo,loggingOut} from "../../firebase/authMethods"
import { TouchableOpacity } from 'react-native';

const DATA1 = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const DATA2 = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
    title: 'Second Item',
  },
];

const EditProfile = ({navigation}) => {
  const [userInfo,setUserInfo] = useState('')
  const [busyModal, setBusyModal] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  useEffect(()=>{
    fetchUserInfo()
  },[])

  const fetchUserInfo=async()=>{
    await getUserInfo().then((response)=>{
      setBusyModal(false);
      console.log("response:",response.length)
      if(response.length<=0){
        console.log("response:",response.length)
        setErrorModalText('Unknown error occurred.');
        setErrorModal(true);
      } else {
        setUserInfo(response)
      }
    })
  }

  const logoutUser=async()=>{
    await loggingOut().then(()=>{
        navigation.reset({
          index:0,
          routes:[{name:'Onboarding'}]
        })  
      }
    )
  } 

  const renderItem = (item, index) => {
    return (
      <Item 
        style={styles.featured}
        image={assets.images.samples.featured}
        featured
        unmarked
        price={5} 
      />
    )
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topView}>
        <Image style={styles.topImage} source={assets.images.samples.profile_back} />
        <View style={styles.topRowView}>
          <Image style={styles.avatar} source={userInfo=='' ? assets.images.icons.uploadIcon :{uri: userInfo[0].imageUrl}} />
          <TouchableOpacity style={styles.bageConatiner} onPress={()=>{logoutUser()}}>
            <Text style={styles.badgeText}>logout</Text>
          </TouchableOpacity>
          <View style={styles.bageConatiner}>
            <Text style={styles.badgeText}>Edit Profile</Text>
          </View>
        </View>
       
      </View>
      <View style={styles.titleView}>
        <Text style={styles.name}>{userInfo=='' ? "Name":userInfo[0].ProfileName}</Text>
        <Text style={styles.location}>
          <Icon name="location-on" type="material" color="#9F9F9F" size={14} />{userInfo=='' ? "location":userInfo[0].location}
        </Text>
        <Text style={styles.description}>{userInfo=='' ? "description" : userInfo[0].description}</Text>
        <Text style={styles.detail}>
          <Text style={{fontWeight: 'bold'}}>200</Text> Following
          <Text>          </Text>
          <Text style={{fontWeight: 'bold', marginLeft: 10}}>17.4K</Text> Followers
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>Outgoing</Text>
        <TwoColumnsView
          data={DATA1}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>Looking for</Text>
        <TwoColumnsView
          data={DATA2}
          renderItem={renderItem}
        />
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
    </ScrollView>
  );
};

const paddingHorizontal = config.paddingHorizontal;
const borderBottomColor = '#A0A0A0';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  topView: {
    width: '100%',
  },
  topRowView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    height: 40,
    paddingHorizontal
  },
  topImage: {
    width: '100%'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'white'
  },
  bageConatiner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    backgroundColor: config.themeColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 3
  },
  chatIcon: {
    width: 20,
    height: 20,
    marginLeft: 20
  },
  titleView: {
    paddingHorizontal,
    paddingVertical: 20,
    borderBottomColor,
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  location: {
    fontSize: 14,
    color: '#9F9F9F'
  },
  description: {
    fontSize: 16,
    marginTop: 10
  },
  detail: {
    fontSize: 16,
    marginTop: 5
  },
  detailView: {
    display: 'flex',
    flexDirection: 'row'
  },
  itemContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal
  },
  itemTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold'
  }, 
  itemList: {
    width: '100%',
    height: '100%',
    marginTop: 20,
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  featured: {
    width: '48%',
    height: 200
  },
});

export default EditProfile;
