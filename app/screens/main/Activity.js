import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import ChatUser from '../../components/pages/ChatUser';
import config from '../../config';
import assets from '../../assets';

const DATA1 = [
  {
    id: 1,
    avatar: assets.images.samples.avatar1,
    name: "Samanta",
    content: "Thanks for following me!",
  },
  {
    id: 2,
    avatar: assets.images.samples.avatar2,
    name: "Lisa",
    content: "Hi there!",
  },
  {
    id: 3,
    avatar: assets.images.samples.avatar1,
    name: "Samanta",
    content: "Thanks for following me!",
  },
  {
    id: 4,
    avatar: assets.images.samples.avatar2,
    name: "Lisa",
    content: "Hi there!",
  },
  {
    id: 5,
    avatar: assets.images.samples.avatar1,
    name: "Samanta",
    content: "Thanks for following me!",
  },
  {
    id: 6,
    avatar: assets.images.samples.avatar2,
    name: "Lisa",
    content: "Hi there!",
  },
  {
    id: 7,
    avatar: assets.images.samples.avatar1,
    name: "Samanta",
    content: "Thanks for following me!",
  },
  {
    id: 8,
    avatar: assets.images.samples.avatar2,
    name: "Lisa",
    content: "Hi there!",
  },
]


const DATA2 = [
  {
    id: 1,
    avatar: assets.images.samples.avatar1,
    name: "Samanta",
    content: "Thanks for following me!",
  },
  {
    id: 2,
    avatar: assets.images.samples.avatar2,
    name: "Lisa",
    content: "Hi there!",
  },
  {
    id: 3,
    avatar: assets.images.samples.avatar1,
    name: "Samanta",
    content: "Thanks for following me!",
  },
  {
    id: 4,
    avatar: assets.images.samples.avatar2,
    name: "Lisa",
    content: "Hi there!",
  },
  {
    id: 5,
    avatar: assets.images.samples.avatar1,
    name: "Samanta",
    content: "Thanks for following me!",
  },
  {
    id: 6,
    avatar: assets.images.samples.avatar2,
    name: "Lisa",
    content: "Hi there!",
  },
  {
    id: 7,
    avatar: assets.images.samples.avatar1,
    name: "Samanta",
    content: "Thanks for following me!",
  },
  {
    id: 8,
    avatar: assets.images.samples.avatar2,
    name: "Lisa",
    content: "Hi there!",
  },
]

const Activity = (props) => {

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <ChatUser
        style={styles.chatUser}
        image={item.avatar}
        name={item.name}
        content={item.content}
      />
      <SmallButton style={styles.followButton} title="Follow back" />
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>
      <View style={styles.mainContainer}>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>This week</Text>
          <FlatList
            style={styles.chatList}
            renderItem={renderItem}
            data={DATA1}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View style={[styles.listContainer, styles.listBorder]}>
          <Text style={styles.listTitle}>This month</Text>
          <FlatList
            style={styles.chatList}
            renderItem={renderItem}
            data={DATA2}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const paddingHorizontal = config.paddingHorizontal;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  searchBox: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 15,
    marginTop: 20
  },
  chatList: {
    flex: 1,
    width: '100%',
    marginTop: 20
  },
  chatUser: {
    flex: 1
  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  listContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal,
    paddingTop: 10,
  },
  listItem: {
    paddingHorizontal,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  followButton: {
    width: 100,
    marginLeft: 10
  },
  listBorder: {
    borderColor: '#999999', 
    borderTopWidth: 1, 
    marginTop: 10
  }
});

export default Activity;
