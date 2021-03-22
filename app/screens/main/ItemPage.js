import React from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
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
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d77',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d79',
    title: 'Third Item',
  },
];

const ItemPage = ({navigation}) => {
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
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.topImage} source={assets.images.samples.item} />
      <View style={styles.titleView}>
        <View style={styles.titelRowView}>
          <Text style={styles.title}>Pencil Cases</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('sellerprofile')}>
            <Image
              style={styles.avatar}
              source={assets.images.samples.avatar2}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.titelRowView, {marginTop: 10}]}>
          <Text style={styles.price}>$15</Text>
          <Text style={styles.location}>Tronto, Canada</Text>
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
          Hi all! I am Lisa and I’m from Toronto. I would like to arrange a swap
          with someone, please send me a DM if you are interested
        </Text>
      </View>
      <View style={styles.chatHistoryView}>
        <ChatUser
          style={styles.chatUser}
          image={assets.images.samples.avatar1}
          name="Samanta"
          content="Wonderful pencil cases! I sent you a DM!"
        />
        <ChatUser
          style={styles.chatUser}
          image={assets.images.samples.avatar2}
          name="Bella"
          content="I love this!"
        />
      </View>
      <View style={styles.commentView}>
        <Image
          style={styles.commentAvatar}
          source={assets.images.samples.avatar1}
        />
        <Input
          containerStyle={styles.commentInputContainer}
          inputContainerStyle={{borderBottomWidth: 0, height: '100%'}}
          inputStyle={styles.commentInput}
          rightIcon={<CustomButton style={styles.commentButton} title="Post" />}
          placeholder="Add a comment..."
        />
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
    width: '100%',
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
  },
  commentInput: {
    color: 'black',
    fontSize: 14,
  },
  commentButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: '#F36190',
    width: 50,
    height: '100%',
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
});

export default ItemPage;
