import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View, Text,TouchableOpacity } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Database from '../../Database';

const db = new Database();

export default class JobScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Job List',
      headerRight: (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
        <TouchableOpacity onPress={() => { 
            navigation.navigate('WeatherScreen', {
              onNavigateBack: this.handleOnNavigateBack
            }); 
          }}> 
          <View>
          <Text style={styles.title}>Weather</Text>
          </View>
        </TouchableOpacity>
        <Button
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 10, fontSize: 28 } }}
          onPress={() => { 
            navigation.navigate('AddJob', {
              onNavigateBack: this.handleOnNavigateBack
            }); 
          }}
        />
        </View>
        
      ),
    };
  };

  constructor() {
    super();
    this.state = {
      isLoading: false,
      jobs: [],
      notFound: 'Jobs not found.\nPlease click (+) button to add it.'
    };
    this.getJobs();
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getJobs();
    });
  }
  componentWillMount(){
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
        this.getJobs();
      });
  }

  getJobs() {
    let jobs = [];
    db.listJob().then((data) => {
      jobs = data;
      this.setState({
        jobs,
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      title={item.jobName}
      leftAvatar={{
        title: item.jobName[0]
      }}
      onPress={() => {
        this.props.navigation.navigate('JobDetails', {
          jobId: `${item.jobId}`,
        });
      }}
      chevron
      bottomDivider
    />
  )

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    if(this.state.jobs.length === 0){
      return(
        <View>
          <Text style={styles.message}>{this.state.notFound}</Text>
        </View>
      )
    }
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.jobs}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
  message: {
    padding: 16,
    fontSize: 18,
    color: 'red'
  },
  title: {
    padding: 16,
    fontSize: 18,
    color: 'black'
  }
});