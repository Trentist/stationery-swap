import React,{useState} from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import { ImageButton } from '../../components/common';
import Item from '../../components/pages/Item';
import assets from '../../assets';
import {followItem,unfollowItem} from '../../firebase/ratingMethods';

const Category = ({navigation,route}) => {
  const {products} = route.params;
  const [productList,setProductList] = useState(products)
  


  const togglePress=async(item)=>{
  const {key,isFollowed,viewCount,followedArray}=item
    let array = [...productList]
    let elementsIndex = array.findIndex(element => element.key == key )
    array[elementsIndex] = {...array[elementsIndex], isFollowed: !array[elementsIndex].isFollowed}
    setProductList(array)
    if(isFollowed){
      const followedValue=followedArray.length-1
      const ratingValue=(viewCount+followedValue)/2
      await unfollowItem(key,followedArray,ratingValue).catch((error)=>{
        setErrorModalText(error);
        setErrorModal(true);
      })
    }else{
      const followedValue=followedArray.length+1
      const ratingValue=(viewCount+followedValue)/2
      await followItem(key,followedArray,ratingValue).catch((error)=>{
        setErrorModalText(error);
        setErrorModal(true);
      })
    }
  }

  const renderItem = ({ item }) => {
  const {imageArray,isFollowed,price}=item
  return (
    <Item
      style={styles.featured}
      image={{uri:imageArray[0]}}
      featured
      item={item}
      onPress={()=>togglePress(item)}
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
          data={productList}
          keyExtractor={item => item.key.toString()}
          numColumns={2}
          onEndReached = {({distanceFromEnd})=>{ // problem
            console.log(distanceFromEnd) // 607, 878 
            console.log('reached');
          }}
          onEndReachedThreshold={0.5}
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
