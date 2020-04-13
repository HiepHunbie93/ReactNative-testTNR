import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../../Database';

const db = new Database();

export default class JobEditScreen extends Component {
  static navigationOptions = {
    title: 'Edit Job',
  };

  constructor() {
    super();
    this.state = {
      jobId: '',
      jobName: '',
      jobDesc: '',
      jobPrice: '0',
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    db.jobById(navigation.getParam('jobId')).then((data) => {
      console.log(data);
      const job = data;
      this.setState({
        jobId: job.jobId,
        jobName: job.jobName,
        jobDesc: job.jobDesc,
        jobPrice: job.jobPrice,
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }
  
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateJob() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    let data = {
      jobId: this.state.jobId,
      jobName: this.state.jobName,
      jobDesc: this.state.jobDesc,
      jobPrice: this.state.jobPrice
    }
    db.updateJob(data.jobId, data).then((result) => {
      console.log(result);
      this.setState({
        isLoading: false,
      });
      this.props.navigation.state.params.onNavigateBack;
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);
      this.setState({
        isLoading: false,
      });
    })
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Job ID'}
              value={this.state.jobId}
              onChangeText={(text) => this.updateTextInput(text, 'jobId')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Job Name'}
              value={this.state.jobName}
              onChangeText={(text) => this.updateTextInput(text, 'jobName')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Job Description'}
              value={this.state.jobDesc}
              onChangeText={(text) => this.updateTextInput(text, 'jobDesc')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Job Price'}
              value={this.state.jobPrice}
              keyboardType='numeric'
              onChangeText={(text) => this.updateTextInput(text, 'jobPrice')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save'}}
            title='Save'
            onPress={() => this.updateJob()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})