import React from 'react';
import { ScrollView, Image, ImageBackground, View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import { Button, TextInput, ActivityIndicator, List, Text } from 'react-native-paper';
import Barcode from '../../barcode/Barcode.js';

export default class ShopProductDetail extends React.Component {
  state = {
    data: {},
    shop_name: {},
    product_code: '',
    product_name: '',
    product_price: null,
    product_image: null,
    quantity: null,
    description: '',
    active: false,
    Aisle_number: '',
    Shelf_number: '',
    Shelf_side: '',
    Category: 1,
    Contents: '',
    product_id: '',
    token: '',
    loading: true,
  };

  componentDidMount() {
    this.getObject();
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All });
      if (!result.cancelled) {
        this.setState({ product_image: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };

  async getObject() {
    const { data } = this.props.navigation.state.params;
    let res = await axios.get(`http://100.26.11.43/product/detailoflist/${data.product_id}`);
    this.setState({
      ...res.data,
      loading: false,
      token: await AsyncStorage.getItem('token'),
    });
  }

  productEditHandler = async () => {
    this.setState({ loading: true });
    let newData = new FormData();
    newData.append('product_name', this.state.product_name);
    newData.append('product_code', this.state.product_code);
    newData.append('product_price', this.state.product_price);
    newData.append('quantity', this.state.quantity);
    newData.append('description', this.state.description);
    newData.append('Category', this.state.Category);
    newData.append('active', this.state.active);
    newData.append('Aisle_number', this.state.Aisle_number);
    newData.append('Shelf_number', this.state.Shelf_number);
    newData.append('Shelf_side', this.state.Shelf_side);

    await fetch(`http://100.26.11.43/product/edit/${this.state.product_id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: this.state.token,
      },
      body: newData,
    });
    this.setState({ loading: false });
  };

  deleteProductHandler = async () => {
    this.setState({ loading: true });
    await axios.delete(this.state.data.delete, { headers: { Authorization: this.state.token } });
    this.props.navigation.goBack();
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color="#17baa1" />
          <StatusBar barStyle="default" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon style={styles.icon} size={25} name="arrow-back-outline" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.productEditHandler}>
            <MaterialCommunityIcons style={styles.icon} size={25} name="check" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity onPress={this._pickImage}>
              <ImageBackground style={styles.imgStyle} source={{ uri: this.state.product_image }}>
                <MaterialCommunityIcons name="pencil" color="black" size={35} />
              </ImageBackground>
            </TouchableOpacity>

            <TextInput label="Product Name" value={this.state.product_name} onChangeText={(value) => this.setState({ product_name: value })} />
            <TextInput label="Product BarCode" value={this.state.product_code} onChangeText={(value) => this.setState({ product_code: value })} />
            <TextInput label="Price" value={this.state.product_price} onChangeText={(value) => this.setState({ product_price: value })} />
            <TextInput label="Quantity" value={this.state.quantity} onChangeText={(value) => this.setState({ quantity: value })} />
            <TextInput label="Description" value={this.state.description} onChangeText={(value) => this.setState({ description: value })} />

            <List.Section>
              <List.Subheader>Shelf Side</List.Subheader>
              <Picker selectedValue={this.state.Shelf_side} onValueChange={(value) => this.setState({ Shelf_side: value })}>
                <Picker.Item label="Left" value="Left" />
                <Picker.Item label="Right" value="Right" />
              </Picker>
            </List.Section>

            <Button mode="contained" onPress={this.deleteProductHandler} color="red">
              Delete Product
            </Button>
            <Button mode="contained" onPress={() => this.props.navigation.navigate('productImages', { product_id: this.state.product_id })} color="green">
              Product Images
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  icon: {
    color: 'white',
  },
  container: {
    padding: 10,
    backgroundColor: '#eee',
  },
  imgStyle: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
