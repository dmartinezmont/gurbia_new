import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Navbar from './../components/Navbar';
import Post from './../components/Post';
import Database from './../database/database';

export default class HomeScene extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ focused }) => {
      const col = focused ? '#c62828' : '#BDBDBD';
      return (<View>
        <Icon name="home" size={25} color={col} />
      </View>);
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  componentWillMount() {
    this.fetchPosts().then(data => {
      this.setState({
        data: data
      });
    });
  }

  async fetchPosts() {
    var data = await Database.getPosts();
    return data;
  }

  formatData = () => {
    let postData = [];
    for (var i in this.state.data) {
      postData.push({
        key: i,
        data: this.state.data[i]
      })
    }
    return postData;
  }

  render() {
    const posts = this.formatData();
    const postsComponents = posts.map(data => {
      return (
        <Post
          info={{ ...data.data, key: data.key }}
          key={data.key}
          navigation={this.props.navigation}
        />
      )
    });

    return (

      <View style={styles.container}>
        <Navbar
          onpressLeft={() => this.props.navigation.navigate('DrawerOpen')}
          iconLeft='menu'
          iconRight='search'
        />
        <ScrollView style={styles.postsList}>
          {postsComponents}
        </ScrollView>
        <ActionButton
          buttonColor='rgba(255, 87, 34, 1)'
          onPress={() => this.props.navigation.navigate('NewPost')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  postsList: {
    padding: 10,
    backgroundColor: '#DDDDDD'
  }
})
