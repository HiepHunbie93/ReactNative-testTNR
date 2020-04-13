import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, ActivityIndicator, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Database from '../../Database';

const db = new Database();

export default class JobDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Job Details',
  }

  constructor() {
    super();
    this.state = {
      isLoading: true,
      job: {},
      id: '',
    };
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      const { navigation } = this.props;
      db.jobById(navigation.getParam('jobId')).then((data) => {
        console.log(data);
        job = data;
        this.setState({
          job,
          isLoading: false,
          id: job.jobId
        });
      }).catch((err) => {
        console.log(err);
        this.setState = {
          isLoading: false
        }
      })
    });
  }
  
  deleteJob(id) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    db.deleteJob(id).then((result) => {
      console.log(result);
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text style={{fontSize: 16}}>Job ID: {this.state.job.jobId}</Text>
            </View>
            <View>
              <Text style={{fontSize: 16}}>Job Name: {this.state.job.jobName}</Text>
            </View>
            <View>
              <Text style={{fontSize: 16}}>Job Desc: {this.state.job.jobDesc}</Text>
            </View>
            <View>
              <Text style={{fontSize: 16}}>Job Price: {this.state.job.jobPrice}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#CCCCCC'}
              leftIcon={{name: 'edit'}}
              title='Edit'
              onPress={() => {
                this.props.navigation.navigate('EditJob', {
                  jobId: `${this.state.id}`,
                });
              }} />
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#999999'}
              color={'#FFFFFF'}
              leftIcon={{name: 'delete'}}
              title='Delete'
              onPress={() => this.deleteJob(this.state.id)} />
          </View>
        </Card>
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
    paddingBottom: 20,
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
  },
  detailButton: {
    marginTop: 10
  }
})