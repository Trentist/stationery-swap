import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, LogBox, Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import Root from './app/Root';
import initStore from './app/redux';

LogBox.ignoreLogs(['Remote debugger']);
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      store: initStore(),
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Provider store={this.state.store}>
          <Root />
        </Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
  },
});
