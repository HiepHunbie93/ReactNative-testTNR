import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import JobScreen from './components/job/JobScreen';
import JobDetailsScreen from './components/job/JobDetailsScreen';
import JobAddScreen from './components/job/JobAddScreen';
import JobEditScreen from './components/job/JobEditScreen';
import WeatherScreen from './components/weather/WeatherScreen';

const RootStack = createStackNavigator(
  {
    Job: JobScreen,
    JobDetails: JobDetailsScreen,
    AddJob: JobAddScreen,
    EditJob: JobEditScreen,
    WeatherScreen: WeatherScreen
  },
  {
    initialRouteName: 'Job',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const RootContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <RootContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});