import React from 'react';
import { ScrollView, Image, ImageBackground, View, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator, StatusBar, TextInput, Platform } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from 'react-native-image-picker';
import { TextField } from 'react-native-material-textfield';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Barcode from '../barcode/Barcode'; // Assuming Barcode is correctly set up

export default class ProductDetail extends React.Component {
  state = {
    data: {},
    shop_name: {},
    product_code: "",
    product_name: "",
    product_price: null,
    product_image: null,
    quantity: null,
    description: "",
    active: false,
    Aisle_number: "",
    Shelf_number: "",
    Shelf_side: "",
    Category: 1,
    Contents: "",
    product_id: "",
    token: '',
    loading: true
  }

  async componentDidMount() {
    await this.getObject();
    const token = await AsyncStorage.getItem('token');
    this.setState({ token: token });
  }

  _pickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        this.setState({ product_image: response.assets[0].uri });
      }
    });
  };

  async getObject() {
    const { url } = this.props.navigation.state.params;
    let res = await axios.get(url);
    this.setState({
      data: res.data,
      shop_name: res.data.shop_name,
      product_code: res.data.product_code,
      product_name: res.data.product_name,
      product_price: res.data.product_price,
      product_image: res.data.product_image,
      quantity: res.data.quantity,
      description: res.data.description,
      active: res.data.active,
      Category: res.data.Category,
      Contents: res.data.contents,
      product_id: res.data.product_id,
      Aisle_number: res.data.Aisle_number,
      Shelf_number: res.data.Shelf_number,
      Shelf_side: res.data.Shelf_side,
      loading: false
    });
  }

  productEditHandler = async () => {
    this.setState({ loading: true });
    let image_name = this.state.product_image.split('/').pop();
    let photo = {
      uri: this.state.product_image,
      name: image_name,
      type: 'image/jpg'
    };

    let newData = new FormData();
    if (this.state.product_image) newData.append("product_image", photo);
    newData.append("product_name", this.state.product_name);
    newData.append("product_code", this.state.product_code);
    newData.append("product_price", this.state.product_price);
    newData.append("quantity", this.state.quantity);
    newData.append("description", this.state.description);
    newData.append("Category", this.state.Category);
    newData.append("active", this.state.active);
    newData.append("Aisle_number", this.state.Aisle_number);
    newData.append("Shelf_number", this.state.Shelf_number);
    newData.append("Shelf_side", this.state.Shelf_side);

    const url = this.state.data.edit;
    let response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': this.state.token
      },
      body: newData
    });
    this.setState({ loading: false });
    console.log(response.data);
  };

  deleteProductHandler = async () => {
    this.setState({ loading: true });
    await axios.delete(this.state.data.delete, {
      headers: {
        Authorization: this.state.token
      }
    });
    this.props.navigation.navigate('index');
  };

  render() {
    const { product_code } = this.state;
    
    if (this.state.loading) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: "black", justifyContent: "space-between", flexDirection: "row" }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: "white", padding: 12 }} size={25} name="arrow-back-outline" />
            </TouchableOpacity>
          </View>

          <View style={styles.activityContainer}>
            <ActivityIndicator size="large" color="#17baa1" />
            <StatusBar barStyle="default" />
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: "black", justifyContent: "space-between", flexDirection: "row" }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: "white", padding: 12 }} size={25} name="arrow-back-outline" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.productEditHandler}>
              <MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="check" />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={styles.container}>
              <TouchableOpacity onPress={this._pickImage}>
                <ImageBackground style={styles.imgStyle} source={{ uri: this.state.product_image }}>
                  <MaterialCommunityIcons name="pencil" color="black" style={{ alignItems: "flex-end" }} size={35} />
                </ImageBackground>
              </TouchableOpacity>

              <View style={styles.viewStyle}>
                <TextField
                  labelFontSize={15}
                  tintColor="orange"
                  baseColor="gray"
                  label="Product Name"
                  onChangeText={product_name => this.setState({ product_name })}
                  value={this.state.product_name}
                />
              </View>

              {/* Barcode Component */}
              <TouchableOpacity onPress={() => this.props.navigation.navigate("productBarcode", { code: product_code })}>
                <Barcode
                  value={product_code.toString()}
                  options={{ format: 'CODE128', background: '#ffffff' }}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  imgStyle: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center"
  },
  viewStyle: {
    margin: 10
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
