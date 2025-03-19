import React, { useState, useEffect } from 'react';
import { 
  Button, Image, View, Text, TouchableOpacity, ScrollView, 
  ActivityIndicator, ImageBackground, Platform, Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { request, PERMISSIONS } from 'react-native-permissions';

const backgroundImage = require("../assets/Screenshot_20200703-173531.png");

const AddProduct = ({ navigation }) => {
  const [product, setProduct] = useState({
    product_code: "",
    product_name: "",
    product_price: null,
    product_image: null,
    quantity: null,
    description: "",
    active: true,
    Aisle_number: "",
    Shelf_number: "",
    Shelf_side: "Empty",
    Category: "",
  });

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [categories, setCategories] = useState([]);
  const [superuser, setSuperuser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await categoriesRetrieveHandler();
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
      
      try {
        let res2 = await axios.get("http://100.25.15.160/auth/super-check/", {
          headers: { Authorization: storedToken }
        });
        if (res2.data.status === 200) {
          setSuperuser(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const categoriesRetrieveHandler = async () => {
    try {
      let res = await axios.get("http://100.25.15.160/product/list/cat/");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to request camera permissions (for Android)
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      if (result !== 'granted') {
        Alert.alert("Permission Denied", "Camera access is required to take photos.");
        return false;
      }
    }
    return true;
  };

  const pickImage = async (type) => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    };

    if (type === 'capture') {
      ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorMessage) {
          console.log('Camera Error: ', response.errorMessage);
        } else if (response.assets?.length > 0) {
          setProduct((prevState) => ({ ...prevState, product_image: response.assets[0].uri }));
        }
      });
    } else {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled gallery');
        } else if (response.errorMessage) {
          console.log('Gallery Error: ', response.errorMessage);
        } else if (response.assets?.length > 0) {
          setProduct((prevState) => ({ ...prevState, product_image: response.assets[0].uri }));
        }
      });
    }
  };

  const imageUploadHandler = async () => {
    setLoading(true);
    let photo = {
      uri: product.product_image,
      name: 'product.jpg',
      type: 'image/jpg'
    };
    let newData = new FormData();
    newData.append("product_image", photo);
    Object.keys(product).forEach(key => {
      newData.append(key, product[key]);
    });
    
    try {
      let response = await fetch("http://100.25.15.160/product/create/", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        },
        body: newData
      });
      let responseData = await response.json();
      console.log(responseData);
      navigation.navigate('Products');
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return loading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#17baa1" />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "black" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="arrow-left" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>Product image</Text>
          
          {/* Open Camera */}
          <TouchableOpacity onPress={() => pickImage('capture')} style={styles.imagePicker}>
            <ImageBackground source={backgroundImage} style={styles.imgStyle}>
              {product.product_image && <Image source={{ uri: product.product_image }} style={styles.imgStyle} />}
            </ImageBackground>
          </TouchableOpacity>

          {/* Open Gallery */}
          <Button title="Pick from Gallery" color="orange" onPress={() => pickImage('gallery')} />

          <View style={styles.pickerContainer}>
            <Text style={{ color: "#17baa1", fontSize: 18 }}>Shelf Side</Text>
            <Picker
              selectedValue={product.Shelf_side}
              style={{ width: 300, color: "orange" }}
              onValueChange={(itemValue) => setProduct({ ...product, Shelf_side: itemValue })}
            >
              <Picker.Item label="Empty" value="Empty" />
              <Picker.Item label="Left" value="Left" />
              <Picker.Item label="Right" value="Right" />
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={{ color: "#17baa1", fontSize: 18 }}>Select Category</Text>
            <Picker
              selectedValue={product.Category}
              style={{ width: 300, color: "orange" }}
              onValueChange={(itemValue) => setProduct({ ...product, Category: itemValue })}
            >
              {categories.map((item, key) => (
                <Picker.Item label={item.category_name} value={item.id} key={key} />
              ))}
            </Picker>
          </View>

          {superuser && (
            <TouchableOpacity style={{ marginTop: 20 }}>
              <Button color="orange" title="Create" onPress={imageUploadHandler} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  imgStyle: { width: '100%', height: 200, elevation: 3 },
  mainContainer: { marginBottom: 20, backgroundColor: "#fff" },
  container: { margin: 10, padding: 15, backgroundColor: "rgb(245, 245, 245)", elevation: 3 },
  textStyle: { fontSize: 15, color: "#17baa1", margin: 5 },
  pickerContainer: { marginTop: 10 }
};

export default AddProduct;
