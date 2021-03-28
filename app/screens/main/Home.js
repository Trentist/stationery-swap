import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {Input} from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Item from '../../components/pages/Item';
import assets from '../../assets';
import {getProducts} from '../../firebase/productMethods';
import {getfolloweditems} from '../../firebase/ratingMethods'
import {CustomModal} from '../../components/common';

const categories = [{
  value: 'School',
}, {
  value: 'Home',
}, {
  value: 'Great',
}];

const Home = ({navigation}) => {
  const [busyModal, setBusyModal] = useState(true);
  const [featureProducts,setFeatureProducts] = useState([])
  const [followedProducts,setfollowedProducts] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      fetchProducts()
  }, [])
  );

  const fetchProducts=async()=>{
    await getProducts().then(async(response)=>{
    console.log("response:",response)
    await getfolloweditems().then((responsed)=>{
      console.log("followed items",responsed)
      let followed=[];  
      let result = response.map((el)=> {
        let obj = Object.assign({...el});
        obj.isFollowed = responsed.some((selectedItem)=> {
          console.log("item key:",obj.key)
          if(selectedItem.followCount==0){
            return false
          }
          return selectedItem.ItemId === obj.key
        })
        return obj;
      })
      
      result.forEach((item)=>{
       if(item.isFollowed){
        followed.push(item)
       }
      })
      setFeatureProducts(result)
      setfollowedProducts(followed)
      setBusyModal(false);
    })   
    })
  }

  const renderFeaturedItem = ({item}) => {
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

  const renderCategoryItem = ({item}) => {
    const {value} = item 
    let topItem = featureProducts[0];
    let count=0
    featureProducts.forEach((item)=>{
    if(value == item.category){
      ++count
      if(topItem.rating <= item.rating){  
      topItem=item
      }
    }
    })
    if(count>=1){
    const {imageArray} = topItem 
    return (
      <Item
        style={styles.category}
        image={{uri:imageArray[0]}}
        item={topItem}
        category
        title={value}
        />
      );
    }
  }

  const separator = () => <View style={{width: 25}}></View>;
  return (
    <View style={styles.container}>
      <Input
        placeholder="Search..."
        leftIcon={{type: 'font-awesome', name: 'search'}}
        inputContainerStyle={{borderBottomWidth: 0, height: '100%'}}
        containerStyle={styles.searchBox}
        inputStyle={{fontSize: 15, paddingVertical: 0}}
      />
      {busyModal ?
      (
        <CustomModal
        show={busyModal}
        onClose={() => setBusyModal(false)}
        busy={true}
        backPress={true}
        text="Please wait..."
      />
        ) : (
      <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.itemsContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Featured</Text>
            <TouchableOpacity>
              <Text
                onPress={() => navigation.navigate('Category',{
                  products:featureProducts
                })}
                style={styles.seeAll}>
                See all ▶
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={styles.itemList}
            ItemSeparatorComponent={separator}
            renderItem={renderFeaturedItem}
            showsHorizontalScrollIndicator={false}
            data={featureProducts}
            keyExtractor={(item) => item.key.toString()}
            horizontal
          />
        </View>
        <View style={[styles.itemsContainer, styles.categoryContainer]}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Categories</Text>
            <TouchableOpacity>
              <Text
                onPress={() => navigation.navigate('Category')}
                style={styles.seeAll}>
                See all ▶
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.itemList}
            ItemSeparatorComponent={separator}
            renderItem={renderCategoryItem}
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item,index) => index.toString()}
            horizontal
          />
        </View>
        <View style={(styles.itemsContainer, styles.followContainer)}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>People you follow</Text>
            <TouchableOpacity>
              <Text
                onPress={() => navigation.navigate('Category',{
                  products:followedProducts
                })}
                style={styles.seeAll}>
                See all ▶
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.itemList}
            ItemSeparatorComponent={separator}
            renderItem={renderFeaturedItem}
            data={followedProducts}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.key.toString()}
            horizontal
          />
        </View>
      </ScrollView>
       )
       }
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  searchBox: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CCCCCC',
    paddingHorizontal: 15,
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemList: {
    width: '100%',
    paddingVertical: 10,
  },
  featured: {
    width: 180,
    height: 200,
  },
  category: {
    width: 150,
    height: 120,
  },
  categoryContainer: {
    marginTop: 10,
  },
  followContainer: {
    marginTop: 20,
  },
});

export default Home;
