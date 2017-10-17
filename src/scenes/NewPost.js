import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button
} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';

import Navbar from './../components/Navbar';
import Database from './../database/database';

export default class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.navigate = this.navigate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.state = { imagePath: '' }
  }


  componentWillMount() {
    this.setState({ imagePath: 'http://thugify.com/wp-content/uploads/2016/08/placeholder.jpg' })
  }
  navigate(id) {
    this.props.navigator.push({ id });
  }

  handleFormSubmit() {
    try {
      if (this.state.imagePath != 'http://thugify.com/wp-content/uploads/2016/08/placeholder.jpg') {
        Database.writePost(
          this.state.imagePath,
          this.state.title,
          this.state.description,
          this.state.location,
          this.state.portions,
          this.state.price
        );
        this.props.navigation.navigate('Home')
      } else {
        alert('Por favor adjunte una imagen')
      }

    } catch (error) {
      console.error('Error: ', error);
    }
  }

  openImage() {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true
    }).then(image => {
      this.setState({ imagePath: image.path })
    }).catch(function (e) {
      console.log('El usuario no eligio foto', e)
    });
  }

  validateField(field) {
    if (field.length > 0) { return true }
    else { return false }
  }

  render() {
    return (
      <View style={styles.createContainer}>
        <Navbar
          onpressLeft={() => { this.props.navigation.goBack() }}
          iconLeft='close'
        />
        <KeyboardAvoidingView
          behavior='position'
          style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: this.state.imagePath }}
            />
            <ActionButton
              buttonColor='rgba(255, 87, 34, 1)'
              onPress={() => this.openImage()}
              offsetX={75}
              offsetY={0}
            />
          </View>
          <View
            style={styles.formContainer}>
            <FormLabel>Title</FormLabel>
            <FormInput
              onChangeText={(title) => this.setState({ title })}
              placeholder='Title'
            />
            <FormLabel>Description</FormLabel>
            <FormInput
              onChangeText={(description) => this.setState({ description })}
              placeholder='Description'
            />
            <FormLabel>Location</FormLabel>
            <FormInput
              onChangeText={(location) => this.setState({ location })}
              placeholder='Location'
            />
            <View style={styles.horizontalAlign}>
              <View style={styles.inputContainer}>
                <FormLabel>Portions</FormLabel>
                <FormInput
                  onChangeText={(portions) => this.setState({ portions })}
                  placeholder='Portions'
                />
              </View>
              <View style={styles.inputContainer}>
                <FormLabel>Price</FormLabel>
                <FormInput
                  onChangeText={(price) => this.setState({ price })}
                  placeholder='Price'
                />
              </View>
            </View>
          </View>
          <Button
            raised
            onPress={() => this.handleFormSubmit()}
            title='SUBMIT'
            backgroundColor='#FF5722'
          />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  createContainer: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  imageContainer: {
    backgroundColor: '#CDCDCD'
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    padding: 10,
  },
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
  },
  addButton: {
    backgroundColor: '#FF5722',
    borderRadius: 25,
  },
  horizontalAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  inputContainer: {
    width: 150,
  }
})
