import React, { Component } from 'react';
import { Button, Image, View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, ImageBackground } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ProductImagesList from './productImagesList';
import { Picker } from '@react-native-picker/picker';

var backgroundImage = require('../assets/Screenshot_20200703-173531.png');

export default class AddProductImages extends Component {
  state = {
    product_id: '',
    product_code: '',
    product_name: '',
    product_price: null,
    product_image: null,
    quantity: null,
    description: '',
    active: true,
    Category: '',
    loading: true,
    token: '',
    data: [],
  };

  componentDidMount() {
    this.getPermissionAsync();
    this.objRetrieveHandler();
  }

  getPermissionAsync = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({ token: token });
  };

  objRetrieveHandler = async () => {
    let { product_id } = this.props.navigation.state.params;
    this.setState({ product_id: product_id });
    let res = await axios.get('http://100.26.11.43/product/images/' + product_id);
    this.setState({ data: res.data });
    this.setState({ loading: false });
  };

  imagesMapHandler = () => {
    return this.state.data.map((t, key) => <ProductImagesList key={key} data={t} fun={this.reloadFun} />);
  };

  reloadFun = () => {
    this.objRetrieveHandler();
  };

  _pickImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        this.setState({ product_image: response.assets[0].uri });
      }
    });
  };

  productUploadHandler = async () => {
    this.setState({ loading: true });
    let image_name = this.state.product_image.split('/').pop();
    let photo = {
      uri: this.state.product_image,
      name: image_name,
      type: 'image/jpg',
    };
    let newData = new FormData();
    newData.append('category_name', this.state.product_name);
    console.log(newData);

    let response = await fetch('http://100.26.11.43/product/create/cat', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: newData,
    });
    this.setState({ loading: false });
    console.warn(response.data);
  };

  imageUploadHandler = async () => {
    this.setState({ loading: true });
    let photo = {
      uri: this.state.product_image,
      name: 'yourname.jpg',
      type: 'image/jpg',
    };
    let newData = new FormData();
    newData.append('image', photo);
    newData.append('Product', this.state.product_id);
    console.log(newData);

    let response = await fetch('http://100.26.11.43/product/images/LC/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: this.state.token,
      },
      body: newData,
    });
    this.setState({ loading: false });
    this.reloadFun();
  };

  render() {
    let { product_image } = this.state;
    if (this.state.loading) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: 'black' }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialCommunityIcons style={{ color: 'white', padding: 12 }} size={25} name="arrow-left" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: '#fff', padding: 30 }}>
            <ActivityIndicator size="large" color="#17baa1" />
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: 'black' }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialCommunityIcons style={{ color: 'white', padding: 12 }} size={25} name="arrow-left" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
              <Text style={styles.tetxStyle}>Product image</Text>
              <TouchableOpacity onPress={this._pickImage} style={{ borderRadius: 2, borderColor: 'rgb(204, 204, 204)', borderWidth: 1 }}>
                <ImageBackground source={backgroundImage} style={styles.imgStyle}>
                  {product_image && <Image source={{ uri: product_image }} style={styles.imgStyle} />}
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginTop: 20 }}>
                <Button color="orange" title="create" onPress={this.imageUploadHandler} />
              </TouchableOpacity>
            </View>
            <View>{this.imagesMapHandler()}</View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = {
  imgStyle: {
    width: 306,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  mainContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  container: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 3,
    borderColor: 'rgb(204, 204, 204)',
    backgroundColor: 'rgb(245, 245, 245)',
    padding: 15,
  },
  tetxStyle: {
    fontSize: 15,
    color: '#17baa1',
    margin: 5,
  },
};
