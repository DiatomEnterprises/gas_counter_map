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
  TextInput,
  ProgressBarAndroid,
  TouchableHighlight,
  Image,
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
      spentMoney: 0,
      filledLiters:0,
      droveMilliage: 0,
      gotCoords: 'unknown',
    };
  }

  // componentDidMount() {
  //
  // }

  getGpsData(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // var initialPosition = position;
        //{timestep:123124, coords: {longitude: 124, latitude: 124}}
        let {longitude, latitude} = position.coords;
        this.setState({gotCoords: position.coords});
        this.setState({initialLongitude: longitude});
        this.setState({initialLatitude: latitude});
        this.setState({gotGpsData: true});
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    navigator.geolocation.watchPosition(
      (position) => {
        var lastPosition = JSON.stringify(position);
        this.setState({initialLongitude: position.coords.longitude});
        this.setState({initialLatitude: position.coords.latitude});
        this.setState({gotGpsData: true});
        this.render();
      },
      (error) => {}
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
            longitude: this.state.initialLongitude,
            latitude: this.state.initialLatitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <Text style={styles.instructions}>
          Spent money
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(spentMoney) => this.setState({spentMoney})}
          value={this.state.text}
          keyboardType={'numeric'}
        />
        <Text style={styles.instructions}>
          Filled-in liters
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(filledLiters) => this.setState({filledLiters})}
          value={this.state.text}
          keyboardType={'numeric'}
        />
        <Text style={styles.instructions}>
          Milliage from the last point
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(droveMilliage) => this.setState({droveMilliage})}
          value={this.state.text}
          keyboardType={'numeric'}
        />
        <Text style={styles.instructions}>
          {this.state.initialLatitude}
        </Text>
        <TouchableHighlight onPress={this._onPressButton}>
          <Image
            style={styles.button}
            source={require('image!myButton')}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

_submitForm = () => {
    const { username, password } = this.state

    // do some stuff here…
  };
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
