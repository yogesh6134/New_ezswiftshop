import React from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Image, ImageBackground } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput as PaperTextInput, HelperText, Button as PaperButton } from 'react-native-paper';

export default class CreateShopProfile extends React.Component {
  state = {
    data: [],
    shop_name: "",
    address_line_1: "",
    address_line_2: "",
    town_city: "",
    country: "",
    shop_image: null,
    contact: "",
    email_address: "",
    timming: "",
    shop_details: "",
    active: true,
    delivery_charges: "",
    Category: null,
    token: "",
    loading: true,
  };

  componentDidMount() {
    this.categoriesRetrieveHandler();
  }

  categoriesRetrieveHandler = async () => {
    let res = await axios.get("http://100.26.11.43/shops/shopcat/LC/");
    this.setState({ data: res.data });
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
      });
      if (!result.cancelled) {
        this.setState({ shop_image: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };

  categoriesMapHandler = () => {
    return this.state.data.map((i, key) => (
      <Picker.Item label={i.category_name} value={i.id} key={key} />
    ));
  };

  profileCreateHandler = async () => {
    this.setState({ loading: true });
    let newData = new FormData();
    if (this.state.shop_image) {
      let image_name = this.state.shop_image.split('/').pop();
      newData.append("shop_image", {
        uri: this.state.shop_image,
        name: image_name,
        type: 'image/jpg',
      });
    }
    newData.append("shop_name", this.state.shop_name);
    newData.append("address_line_1", this.state.address_line_1);
    newData.append("address_line_2", this.state.address_line_2);
    newData.append("town_city", this.state.town_city);
    newData.append("country", this.state.country);
    newData.append("contact", this.state.contact);
    newData.append("email_address", this.state.email_address);
    newData.append("timming", this.state.timming);
    newData.append("shop_details", this.state.shop_details);
    newData.append("delivery_charges", this.state.delivery_charges);
    newData.append("active", this.state.active);
    newData.append("Category", this.state.Category);

    let response = await fetch("http://100.26.11.43/shops/create-shop-profile/", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: this.state.token,
      },
      body: newData,
    });

    this.setState({ loading: false });
    AsyncStorage.removeItem('shoptoken');
    this.props.navigation.navigate('profile');
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#17baa1" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity onPress={this._pickImage}>
              <ImageBackground style={styles.imgStyle} source={{ uri: this.state.shop_image }}>
                <MaterialCommunityIcons name="pencil" color="black" size={35} />
              </ImageBackground>
            </TouchableOpacity>

            <PaperTextInput
              label="Shop Name"
              value={this.state.shop_name}
              onChangeText={(value) => this.setState({ shop_name: value })}
              mode="outlined"
            />
            
            <PaperTextInput
              label="Address Line 1"
              value={this.state.address_line_1}
              onChangeText={(value) => this.setState({ address_line_1: value })}
              mode="outlined"
            />
            
            <Picker
              selectedValue={this.state.Category}
              onValueChange={(itemValue) => this.setState({ Category: itemValue })}>
              {this.categoriesMapHandler()}
            </Picker>

            <PaperButton mode="contained" onPress={this.profileCreateHandler}>
              Create Profile
            </PaperButton>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 10,
    backgroundColor: "#eee",
  },
  imgStyle: {
    height: 300,
    width: "100%",
    borderRadius: 5,
  },
};