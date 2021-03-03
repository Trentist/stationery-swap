import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import ChatUser from '../../components/pages/ChatUser';
import config from '../../config';
import assets from '../../assets';

const DATA = [
  {
    id: 1,
    avatar: assets.images.samples.avatar1,
    name: "Samanta",
    content: "Thanks for following me!",
    date: "2d"
  },
  {
    id: 2,
    avatar: assets.images.samples.avatar2,
    name: "Lisa",
    content: "Hi there!",
    date: "1w"
  },
  {
    id: 3,
    avatar: assets.images.samples.avatar1,
    name: "Samanta",
    content: "Thanks for following me!",
    date: "2d"
  },
  {
    id: 4,
    avatar: assets.images.samples.avatar2,
    name: "Lisa",
    content: "Hi there!",
    date: "1w"
  },
  {
    id: 5,
    avatar: assets.images.samples.avatar1,
    name: "Samanta",
    content: "Thanks for following me!",
    date: "2d"
  },
  {
    id: 6,
    avatar: assets.images.samples.avatar2,
    name: "Lisa",
    content: "Hi there!",
    date: "1w"
  },
  {
    id: 7,
    avatar: assets.images.samples.avatar1,
    name: "Samanta",
    content: "Thanks for following me!",
    date: "2d"
  },
  {
    id: 8,
    avatar: assets.images.samples.avatar2,
    name: "Lisa",
    content: "Hi there!",
    date: "1w"
  },
]

const Messages = (props) => {

  const renderItem = ({ item }) => (
    <ChatUser
      style={styles.chatUser}
      image={item.avatar}
      name={item.name}
      content={item.content}
      date={item.date}
    />
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View style={{paddingHorizontal: 20, width: '100%'}}>
        <Input
          placeholder='Search...'
          leftIcon={{ type: 'font-awesome', name: 'search' }}
          inputContainerStyle={{borderBottomWidth:0, height: '100%'}}
          containerStyle={styles.searchBox}
          inputStyle={{fontSize: 15, paddingVertical: 0}}
        />
      </View>
      <FlatList
        style={styles.chatList}
        renderItem={renderItem}
        data={DATA}
        keyExtractor={item => item.id}
      />
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
    paddingHorizontal,
    paddingVertical: 10,
  },
});

export default Messages;
