import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import assets from '../../assets';
import {ImageButton, SmallButton} from '../../components/common';
import {Input, Icon} from 'react-native-elements';
import ChatUser from '../../components/pages/ChatUser';
import config from '../../config';

const DATA = [
  {
    id: 1,
    content: 'Thanks for following me!',
    left: true,
  },
  {
    id: 2,
    content:
      'Hi Samantha! I am Marissa Toronto. I would like to arrange a swap with you.',
    left: false,
  },
  {
    id: 3,
    content: 'Great! Which item would you like to swap?',
    left: true,
  },
  {
    id: 4,
    content: 'It’s a notebook, I like rose one the most!',
    left: false,
  },
  {
    id: 5,
    content: 'Thanks for following me!',
    left: true,
  },
  {
    id: 6,
    content:
      'Hi Samantha! I am Marissa Toronto. I would like to arrange a swap with you.',
    left: false,
  },
  {
    id: 7,
    content: 'Great! Which item would you like to swap?',
    left: true,
  },
  {
    id: 8,
    content: 'It’s a notebook, I like rose one the most!',
    left: false,
  },
  {
    id: 9,
    content: 'Great! Which item would you like to swap?',
    left: true,
  },
  {
    id: 10,
    content: 'It’s a notebook, I like rose one the most!',
    left: false,
  },
];

const Chatbox = ({navigation}) => {
  const renderItem = ({item}) => {
    const alignStyle = {justifyContent: item.left ? 'flex-start' : 'flex-end'};
    const leftTextStyle = {
      backgroundColor: '#DDDDDD',
      color: 'black',
    };
    const rightTextStyle = {
      backgroundColor: '#5473a7',
      color: 'white',
      borderWidth: 0,
    };
    return (
      <View style={[styles.messageRow, alignStyle]}>
        {item.left && (
          <Image style={styles.avatar} source={assets.images.samples.avatar2} />
        )}
        <Text
          style={[styles.message, item.left ? leftTextStyle : rightTextStyle]}>
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <ImageButton
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          source={assets.images.icons.back}
        />
        <ChatUser
          style={styles.chatUser}
          image={assets.images.samples.avatar2}
          name="Samanta"
          content="Toronto, Canada"
        />
        <SmallButton style={styles.profileButton} title="See Profile" />
      </View>
      <View style={styles.chatList}>
        <FlatList
          style={styles.chatList}
          renderItem={renderItem}
          data={DATA}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Message..."
          rightIcon={
            <View style={styles.rightIconContainer}>
              <TouchableOpacity activeOpacity={0.7}>
                <Icon
                  name="microphone"
                  type="font-awesome"
                  color="gray"
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={{marginLeft: 10}}>
                <Icon name="image" type="font-awesome" color="gray" size={20} />
              </TouchableOpacity>
            </View>
          }
          inputContainerStyle={{borderBottomWidth: 0, height: '100%'}}
          containerStyle={styles.chatInput}
          inputStyle={{fontSize: 15, paddingVertical: 0}}
        />
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
    paddingTop: 10,
  },
  titleBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal,
    paddingBottom: 5,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
  },
  chatUser: {
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
  },
  profileButton: {
    width: 100,
  },
  chatList: {
    flex: 1,
    width: '100%',
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  inputContainer: {
    height: 50,
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  chatInput: {
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 15,
    width: '100%',
  },
  rightIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {
    paddingHorizontal: 5,
  },
  messageRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  avatar: {
    width: (config.avatar_size / 3) * 2,
    height: (config.avatar_size / 3) * 2,
    borderRadius: config.avatar_size / 3,
    marginRight: 10,
  },
  message: {
    borderRadius: 10,
    fontSize: 16,
    maxWidth: '70%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexShrink: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default Chatbox;
