/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';

import MapView from 'react-native-maps';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class gas_counter_map extends Component {
  render() {
    return (
      <View style={styles.container}>
      <MapView
        style={styles.map}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 150,
    alignSelf: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('gas_counter_map', () => gas_counter_map);
