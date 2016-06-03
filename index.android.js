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
  ProgressBarAndroid,
  View
} from 'react-native';

class gas_counter_map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialLongitude: 'unknown',
      initialLatitude: 'unknown',
      lastPosition: 'unknown',
      gotGpsData: false,
      watchID: 'unknown',
    };
  }

  // componentDidMount() {
  //
  // }

  getGpsData(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // var initialPosition = position;
        this.setState({initialLongitude: position.coords.longitude});
        this.setState({initialLatitude: position.coords.latitude});
        this.setState({gotGpsData: true});
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var lastPosition = JSON.stringify(position);
        this.setState({lastPosition});
      }
    );
  }

  renderLoadingView(){
    return (
      <View style={styles.container}>
        <ProgressBarAndroid />
        <Text style={styles.instructions}>
          Receiving GPS information...
        </Text>
      </View>
    );
  }

  render() {
    if (!this.state.gotGpsData) {
      this.getGpsData();
      return this.renderLoadingView();
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}

          initialRegion={{
            longitude: this.state.initialLongitude,//this.state.initialPosition.longitude,
            latitude: this.state.initialLatitude,//this.state.initialPosition.latitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <Text style={styles.instructions}>
          {this.state.initialLatitude}
        </Text>
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
