import React, { useState,useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {Input} from 'react-native-elements';
import Item from '../../components/pages/Item';
import {getFeaturedProducts,getTagsProducts,getFollowedProducts} from '../../firebase/productMethods';
import {getTags} from '../../firebase/tagMethods';
import {followItem,unfollowItem} from '../../firebase/ratingMethods';
import {CustomModal} from '../../components/common';

const Home = ({navigation}) => {
  const [featureProducts,setFeatureProducts] = useState([])
  const [tagProducts,setTagProducts] = useState([])
  const [followedProducts,setfollowedProducts] = useState([])
  const [busyModal, setBusyModal] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  
  useEffect(()=>{
    fetchFeaturedProducts()
    fetchTagsProducts()
    fetchFollowedProducts()
  },[])

  const fetchFeaturedProducts=async()=>{
    await getFeaturedProducts(10).then((response)=>{
      console.log("response:",response)
      setFeatureProducts(response)
      setBusyModal(false);
    }).catch((error)=>{
      setBusyModal(false);
      setErrorModalText(error);
      setErrorModal(true);
    })
  }

  const fetchTagsProducts=async()=>{
    await getTags(10).then(async(tags)=>{
      await getTagsProducts(1,tags).then((response)=>{
        console.log("tag product list:",response)
        setTagProducts(response)
      }).catch((error)=>{
        setErrorModalText(error);
        setErrorModal(true);
      })
    }).catch((error)=>{
      setErrorModalText(error);
      setErrorModal(true);
    })
  }

  const fetchFollowedProducts=async()=>{
    await getFollowedProducts(10).then((response)=>{
      console.log("followed:",response)
      setfollowedProducts(response)
    }).catch((error)=>{
      setErrorModalText(error);
      setErrorModal(true);
    })
  }

  const togglePress=async(item)=>{
    const {key,isFollowed,viewCount,followedArray}=item
    let featured = [...featureProducts]
    let followed = [...followedProducts]
    let elementsIndex = featured.findIndex(element => element.key == key )
    featured[elementsIndex] = {...featured[elementsIndex], isFollowed: !featured[elementsIndex].isFollowed}
    setFeatureProducts(featured)
    if(isFollowed){
      followed = followed.filter((item) => {
        return item.key != key
      })
      setfollowedProducts(followed)
      const followedValue=followedArray.length-1
      const ratingValue=(viewCount+followedValue)/2
      await unfollowItem(key,followedArray,ratingValue).catch((error)=>{
        setErrorModalText(error);
        setErrorModal(true);
      })
    }else{
      followed.push(featured[elementsIndex])
      setfollowedProducts(followed)
      const followedValue=followedArray.length+1
      const ratingValue=(viewCount+followedValue)/2
      await followItem(key,followedArray,ratingValue).catch((error)=>{
        setErrorModalText(error);
        setErrorModal(true);
      })
    }
  }

  const renderFeaturedItem = ({item}) => {
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

  const renderTagsItem = ({item}) => {
    const {imageArray,topTag} = item 
    return (
      <Item
        style={styles.category}
        image={{uri:imageArray[0]}}
        item={item}
        category
        title={topTag}
        />
      );
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
            renderItem={renderTagsItem}
            showsHorizontalScrollIndicator={false}
            data={tagProducts}
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
