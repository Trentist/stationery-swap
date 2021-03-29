import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import { ImageButton } from '../../components/common';
import Item from '../../components/pages/Item';
import assets from '../../assets';

const Category = ({navigation,route}) => {
  const {products} = route.params;

  const renderItem = ({ item }) => {
  const {imageArray,isFollowed,price}=item
  return (
    <Item
      style={styles.featured}
      image={{uri:imageArray[0]}}
      featured
      item={item}
      marked={isFollowed}
      price={price}
    />
    );
  }

  const separator = () => (
    <View style={{width: 20, height: 15}}></View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
    
        <ImageButton onPress={()=>navigation.goBack()}  style={styles.backButton} source={assets.images.icons.back} />
       
        <Input
          placeholder='Search...'
          leftIcon={{ type: 'font-awesome', name: 'search' }}
          inputContainerStyle={{borderBottomWidth:0, height: '100%'}}
          containerStyle={styles.searchBox}
          inputStyle={{fontSize: 15, paddingVertical: 0}}
        />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Back To School</Text>
        <FlatList
          style={styles.itemList}
          ItemSeparatorComponent={separator}
          renderItem={renderItem}
          data={products}
          keyExtractor={item => item.key.toString()}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  titleBar: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  searchBox: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CCCCCC',
    paddingHorizontal: 15,
    marginLeft: 20,
    flex: 1
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    marginTop: 30,
  },
  itemList: {
    width: '100%',
    height: '100%',
    marginTop: 20,
  },
  featured: {
    width: '48%',
    height: 200
  },
});

export default Category;
