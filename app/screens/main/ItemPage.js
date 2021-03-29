import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Image,FlatList, ScrollView} from 'react-native';
import {Input} from 'react-native-elements';
import {
  SmallButton,
  CustomButton,
  TwoColumnsView,
} from '../../components/common';
import Item from '../../components/pages/Item';
import ChatUser from '../../components/pages/ChatUser';
import assets from '../../assets';
import config from '../../config';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {viewedItem} from "../../firebase/ratingMethods"
import {sendProductComment,getProductComment} from "../../firebase/productCommentMethods"
import {getUserInfo,getSellerInfo} from "../../firebase/authMethods"

const DATA = [
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
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d71',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Third Item',
  },
];

const ItemPage = ({navigation,route}) => {
  const {key,uid,imageArray,title,price,description,followCount,viewCount} =route.params.itemInfo;
  const [commentList,setCommentList] = useState([])
  const [productComment,setProductComment] = useState([])
  const [userInfo,setUserInfo] = useState([])
  const [sellerInfo,setSellerInfo] = useState([])

  useEffect(()=>{
    increaseCount()
    fetchProductComments()
    fetchUserinfo()
    fetchSellerInfo()
  },[])

  const increaseCount=async()=>{
   const viewsValue=viewCount+1
   const ratingValue=(viewsValue+followCount)/2
   await viewedItem(key,viewsValue,ratingValue).then((response)=>{
    console.log("response in increase count:",response)
   })
  }

  const fetchProductComments=async()=>{
    await getProductComment(key).then((response)=>{
     console.log("response of Product Comments:",response)
     setCommentList(response)
    })
  }

  const fetchUserinfo=async()=>{
    await getUserInfo().then((response)=>{
      console.log("response:",response)
        setUserInfo(response)
    })
  }
  
  const fetchSellerInfo=async()=>{
    await getSellerInfo(uid).then((response)=>{
      console.log("id:",uid)
      console.log("response of seller :",response)
        setSellerInfo(response)
    })
  }

  const sendComment=async()=>{
    let commentArray = [...commentList]
      commentArray.push({
        itemId : key,
        uid : userInfo[0].uid,
        ProfileImage:userInfo[0].imageUrl,
        ProfileName:userInfo[0].ProfileName,
        productComment:productComment
      })
      setCommentList(commentArray)
      console.log("se")
    await sendProductComment(key,userInfo[0].imageUrl,userInfo[0].ProfileName,productComment).then((response)=>{
     console.log("response of send product Comments:",response)
     setProductComment("");
    })
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
    );
  };
  
  const renderCommentsItem = ({item}) => {
    const {ProfileImage,ProfileName,productComment}=item
    console.log("item inside:",item)
    return (
      <ChatUser
      style={styles.chatUser}
      image={{uri:ProfileImage}}
      name={ProfileName}
      content={productComment}
    />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.topImage} source={{uri:imageArray[0]}} />
      <View style={styles.titleView}>
        <View style={styles.titelRowView}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('sellerprofile')}>
            <Image
              style={styles.avatar}
              source={sellerInfo=='' ? assets.images.samples.avatar2 :{uri: sellerInfo[0].imageUrl}}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.titelRowView, {marginTop: 10}]}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.location}>{sellerInfo=='' ? "location" : sellerInfo[0].location}</Text>
        </View>
      </View>
      <View style={styles.messageView}>
        <View style={styles.messageBox}>
          <View style={styles.messageRowView}>
            <Image
              style={styles.messageIcon}
              source={assets.images.icons.chat}
            />
            <Text style={styles.messageTitle}>Send seller a message</Text>
          </View>
          <View style={[styles.messageRowView, {marginTop: 10}]}>
            <Input
              containerStyle={styles.messageInputContainer}
              inputContainerStyle={{borderBottomWidth: 0, height: '100%'}}
              inputStyle={styles.messageInput}
            />
            <SmallButton style={styles.messageButton} title="Send" />
          </View>
        </View>
      </View>
      <View style={styles.descView}>
        <Text style={styles.descTitle}>Description</Text>
        <Text style={styles.descContent}>
        {description}
        </Text>
      </View>
      <View style={styles.chatHistoryView}>
        <FlatList
          renderItem={renderCommentsItem}
          showsVerticalScrollIndicator={false}
          data={commentList}
          keyExtractor={(item,index) => index.toString()}
        />
      </View>
      <View style={styles.commentView}>
        <Image
          style={styles.commentAvatar}
          source={userInfo=='' ? assets.images.icons.uploadIcon :{uri: userInfo[0].imageUrl}}
        />
        <Input
          containerStyle={styles.commentInputContainer}
          inputContainerStyle={{borderBottomWidth: 0, height: '100%'}}
          inputStyle={styles.commentInput}
          value={productComment}
          onChangeText={(text)=>setProductComment(text)}
          placeholder="Add a comment..."
        />
        <View style={styles.commentButtonContainer}>
        <CustomButton style={styles.commentButton} title="Post" onPress={sendComment}/>
        </View>

      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>Similar Items</Text>
        <TwoColumnsView data={DATA} renderItem={renderItem} />
      </View>
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
  topImage: {
    width: '100%',
    height:"20%"
  },
  titleView: {
    width: '100%',
    paddingHorizontal,
    paddingVertical: 10,
    borderBottomColor,
    borderBottomWidth: 1,
    position: 'relative',
  },
  titelRowView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    width: config.avatar_size,
    height: config.avatar_size,
    borderRadius: config.avatar_size / 2,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#00C569',
  },
  location: {
    fontSize: 16,
    color: '#9F9F9F',
  },
  messageView: {
    paddingHorizontal,
    paddingVertical: 20,
  },
  messageBox: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  messageRowView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  messageIcon: {
    width: 20,
    height: 20,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  messageInputContainer: {
    flex: 1,
    height: 25,
    borderRadius: 12,
    backgroundColor: '#DDDDDD',
  },
  messageInput: {
    color: 'black',
    fontSize: 12,
  },
  messageButton: {
    width: 60,
    marginLeft: 20,
  },
  descView: {
    paddingHorizontal,
    paddingBottom: 20,
    borderBottomColor,
    borderBottomWidth: 1,
  },
  descTitle: {
    fontSize: 20,
  },
  descContent: {
    fontSize: 16,
    marginTop: 10,
  },
  chatHistoryView: {
    borderBottomColor,
    borderBottomWidth: 1,
    width: '100%'
  },
  chatUser: {
    paddingHorizontal,
    paddingVertical: 10,
  },
  commentView: {
    paddingHorizontal,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor,
    borderBottomWidth: 1,
  },
  commentAvatar: {
    width: config.avatar_size,
    height: config.avatar_size,
    borderRadius: config.avatar_size / 2,
    marginRight: 20,
  },
  commentInputContainer: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    borderColor: '#707070',
    borderWidth: 1,
    alignItems: 'center',
  borderTopRightRadius:0,
  borderBottomRightRadius:0,
  borderRightWidth:0,
  },
  commentInput: {
    color: 'black',
    fontSize: 14,
    
  },
  commentButton: {
    backgroundColor:'transparent',
    color: '#F36190',
    fontSize: 14,
  },
  itemContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal,
  },
  itemTitle: {
    fontSize: 20,
    marginBottom: 10,
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
    paddingVertical: 5,
  },
  featured: {
    width: '48%',
    height: 200,
  },

  commentButtonContainer:
  {

    borderWidth:1,
    borderColor: '#707070',
    height:36,
    justifyContent:'center',
    alignItems:'center',
    width:60,
    borderTopRightRadius:18,
    borderBottomRightRadius:18,
    borderLeftWidth:0,


    
  }
});

export default ItemPage;
