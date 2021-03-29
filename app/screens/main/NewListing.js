import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import assets from '../../assets';
import {
  TwoColumnsView,
  ImageButton,
  CustomModal,
} from '../../components/common';
import * as ImagePicker from 'react-native-image-picker';
import UploadImage from '../../components/pages/UploadImage';
import config from '../../config';
import {addProduct} from '../../firebase/productMethods';

import TagInput from 'react-native-tags-input';

const locations = [
  {
    value: 'Toronto, Canada',
  },
  {
    value: 'Vancouver, Canada',
  },
  {
    value: 'New York, US',
  },
];

const NewListing = (props) => {
  const[tags,setTags]=useState({tag:"",tagsArray:[]})
  const [busyModal, setBusyModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [imageArray, setImageArray] = useState([{}]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [productTags, setProductTags] = useState('');



  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 600,
    maxWidth: 600,
  };

  const selectImage = () => {
    if (imageArray.length >= 11) {
      setErrorModalText('Limit 10 reached.');
      setErrorModal(true);
      return 1;
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('response:', response);
        let array = [...imageArray];
        array.push(response);
        setImageArray(array);
      }
    });
  };

  const publish = async () => {
    setBusyModal(true);
    imageArray.splice(0, 1);
    await addProduct(
      imageArray,
      title,
      price,
      location,
      description,
      productTags,
    ).then((response) => {
      setBusyModal(false);
      console.log('response:', response);
      if (response == 'added') {
        setImageArray([{}]);
        setTitle('');
        setPrice('');
        setLocation('');
        setDescription('');
        setProductTags('');
      } else if (response.code !== undefined && response.code !== null) {
        setErrorModalText('Unknown error occurred.');
        setErrorModal(true);
      }
    });
  };

 const  updateTagState = (state) => {
    setTags(state)
    console.log("Hello",state)
  };

  const renderItem = (item, index) => {
    return (
      <View activeOpacity={0.7} style={styles.imageItem}>
        {item.uri ? (
          <Image style={styles.imageContainer} source={{uri: item.uri}} />
        ) : (
          <TouchableOpacity style={styles.touchable} onPress={selectImage}>
            <Image
              style={styles.uploadIcon}
              source={assets.images.icons.uploadIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageButton
        style={styles.backButton}
        source={assets.images.icons.back}
      />
      <Text style={styles.title}>New Listing</Text>
      <TwoColumnsView data={imageArray} renderItem={renderItem} />
      <Text style={styles.detail}>
        <Text style={styles.bold}>Photos 1/10</Text>
        <Text>
          {' '}
          Choose your listing’s main photo. Add up to 10 photos to show item
          from different angles.
        </Text>
      </Text>
      <TextInput
        style={[styles.textInput, {height: 50}]}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={[styles.textInput, {height: 50}]}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      <Dropdown
        label="Location"
        data={locations}
        value={location}
        containerStyle={styles.dropdown}
        onChangeText={(text) => setLocation(text)}
      />
      <TextInput
        style={[styles.textInput, {height: 120}]}
        placeholder="Description"
        multiline
        textAlignVertical="top"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      {/* <TextInput style={[styles.textInput, {height: 50}]} 
      placeholder="Product Tags" value={productTags} 
      onChangeText={(text)=>setProductTags(text)}/> */}

          <TagInput
          updateState={updateTagState}
          tags={tags}
          placeholder="Tags"                            
          leftElementContainerStyle={{marginLeft: 3}}
          containerStyle={{width: (Dimensions.get('window').width - 20)}}
          inputContainerStyle={[styles.textInput, {backgroundColor:'#fff'}]}
          inputStyle={{color: "gray"}}
          
          tagStyle={styles.tag}
          tagTextStyle={styles.tagText}
        />

      <Text style={[styles.detail, {marginTop: 5}]}>Optimal limit: 10</Text>
      <SmallButton
        style={{width: 100, marginTop: 20}}
        title="Publish"
        onPress={() => {
          publish();
        }}
      />

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

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal,
    paddingVertical: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
  },
  imageItem: {
    width: 150,
    height: 200,
    borderColor: '#707070',
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  detail: {
    fontSize: 14,
    color: '#9F9F9F',
    alignSelf: 'flex-start',
  },
  bold: {
    color: 'black',
    fontWeight: 'bold',
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
    marginTop: 20,
  },
  tag: {
    backgroundColor: '#fff'
  },
tagText: {
    color: "#000000"
  },
});

export default NewListing;
