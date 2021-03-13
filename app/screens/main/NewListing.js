import React from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown'
import assets from '../../assets';
import { TwoColumnsView, ImageButton } from '../../components/common';
import UploadImage from '../../components/pages/UploadImage';
import config from '../../config';

const DATA = [
  {
    id: 1,
    image: assets.images.samples.listing
  },
  {
    id: 2,
    image: assets.images.samples.listing
  },
  {
    id: 3,
    image: null
  }
]

const locations = [{
  value: 'Toronto, Canada',
}, {
  value: 'Vancouver, Canada',
}, {
  value: 'New York, US',
}];

const categories = [{
  value: 'School',
}, {
  value: 'Home',
}, {
  value: 'Great',
}];

const NewListing = (props) => {

  const renderItem = (item, index) => {
    return (
      <UploadImage
        style={styles.imageContainer}
        image={item.image}
      />
    );
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageButton style={styles.backButton} source={assets.images.icons.back} />
      <Text style={styles.title}>New Listing</Text>
      <TwoColumnsView
        data={DATA}
        renderItem={renderItem}
      />
      <Text style={styles.detail}>
        <Text style={styles.bold}>Photos 1/10</Text>
        <Text> Choose your listing’s main photo. Add up to 10 photos to show item from different angles.</Text>
      </Text>
      <TextInput style={[styles.textInput, {height: 50}]} placeholder="Title" />
      <TextInput style={[styles.textInput, {height: 50}]} placeholder="Price" />
      <Dropdown
        label='Category'
        data={categories}
        containerStyle={styles.dropdown}
      />
      <Dropdown
        label='Location'
        data={locations}
        containerStyle={styles.dropdown}
      />
      <TextInput style={[styles.textInput, {height: 120}]} placeholder="Description" multiline textAlignVertical="top" />
      <TextInput style={[styles.textInput, {height: 50}]} placeholder="Product Tags" />
      <Text style={[styles.detail, {marginTop: 5}]}>Optimal limit: 10</Text>
      <SmallButton style={{width: 100, marginTop: 20}} title="Publish"/>
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
    paddingVertical : 10
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontFamily: 'Futura-Bold',
    fontWeight: 'bold',
    marginBottom: 20
  },
  imageContainer: {
    width: '48%',
    height: 200,
  },
  detail: {
    fontSize: 14,
    color: '#9F9F9F',
    alignSelf: 'flex-start'
  },
  bold: {
    color: 'black',
    fontWeight: 'bold'
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

export default NewListing;
