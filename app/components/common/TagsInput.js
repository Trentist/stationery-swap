import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native';
import {Icon} from 'react-native-elements';
 
import TagInput from 'react-native-tags-input';
 
const mainColor = '#ffffff';
 
export default class TagsInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {
        tag: '',
        tagsArray: []
      },
      tagsColor: mainColor,
      tagsText: '#fff',
    };
  }
  
  updateTagState = (state) => {
      this.setState({
        tags: state
      })
    };
 
  render() {
    return (
      <View style={styles.container}>
        <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          placeholder="Tags"                            
          label='Press comma & space to add a tag'
          labelStyle={{color: '#fff'}}
          leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText}/>}
          leftElementContainerStyle={{marginLeft: 3}}
          containerStyle={{width: (Dimensions.get('window').width - 40)}}
          inputContainerStyle={[styles.textInput, {backgroundColor: this.state.tagsColor}]}
          inputStyle={{color: "gray"}}
          onFocus={() => this.setState({tagsColor: '#fff', tagsText: mainColor})}
          onBlur={() => this.setState({tagsColor: mainColor, tagsText: '#fff'})}
          autoCorrect={false}
          tagStyle={styles.tag}
          m
          tagTextStyle={styles.tagText}
          keysForTag={', '}/>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainColor,
  },
  textInput: {
      height: 40,
      borderWidth: 1,
      borderColor:'gray',
      marginTop: 0,
      borderRadius: 5,
      
    },
    tag: {
        backgroundColor: '#fff'
      },
    tagText: {
        color: "#000000"
      },
});