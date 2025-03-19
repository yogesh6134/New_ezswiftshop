import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, TouchableOpacity,  ScrollView, FlatList, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextField } from 'react-native-material-textfield';
import * as ImagePicker from 'react-native-image-picker';
// import CheckBox from '@react-native-community/checkbox';
// import CheckBox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
// import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
var backgroundImage = require("../assets/Screenshot_20200703-173531.png")

const Facility_data = [
  {
    id: 1,
    name: "Wifi"
  },
  {
    id: 2,
    name: "Room Service"
  },
  {
    id: 3,
    name: "Swimming Pool"
  },
  {
    id: 4,
    name: "Parking"
  },
  {
    id: 5,
    name: "Gym Area"
  },
  {
    id: 6,
    name: "Spa Area"
  },
]
const arr = [];


const UpdateBookCount = ({ navigation }) => {


  const [image, setImage] = useState(null);
  const [numberRooms, setNumberRooms] = useState("");
  const [HotelName, setHotelName] = useState('');
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState();
  const [Price, setPrice] = useState('');
  const [Address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [Address1, setAddress1] = useState('');
  const [City, setCity] = useState('')
  const [stateName, setStateName] = useState('');
  const [Country, setCountry] = useState('')
  const [PinCode, setPinCode] = useState('')
  const [PhoneNumber, setPhoneNUmber] = useState('')
  const [Email, setEmail] = useState('');
  const [facilityState, setFacilityState] = useState([])
  const [availability, setAvailability] = useState(false)

  const id = navigation.getParam('room_id');

  useEffect(() => {
    getdata();
  }, []);




  const getdata = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        //   Authorization: token,
      },
    };

    await fetch(`http://100.26.11.43/bnb/roomAPI/` + id, requestOptions)
      .then(res => res.json())
      .then(resData => {
        (
          setImage(resData.image),
          setAvailability(resData.available),
          setHotelName(resData.name),
          setTitle(resData.about),
          setFacilityState(JSON.parse(resData.facility)),
          setPrice(resData.price),
          setNumberRooms(resData.Number_of_rooms),
          setAddress(resData.house_number),
          setAddress1(resData.locality),
          setLandmark(resData.landmark),
          setCity(resData.city),
          setStateName(resData.state),
          setCountry(resData.country),
          setPinCode(resData.pincode),
          setPhoneNUmber(resData.phone),
          setEmail(resData.email),
          setDescription(resData.bestfor)
        )
        console.log(resData)
      })
      .catch(error => console.log(error));
  };


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library



    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const functionFacility = (val) => {
    const newIds = [...facilityState];
    const index = facilityState.findIndex(item => item.id == val.id)
    if (index > -1) {
      newIds.splice(index, 1);
    } else {
      newIds.push(val);
    }
    setFacilityState(newIds);
    console.log(newIds)
  }

  // API

  //fetch data
  const Postdata = async () => {
    const user_id =  await AsyncStorage.getItem('user_id')
    let photo = {
      uri: image, name: "image1.jpg", type: 'image/jpg'
    }
    let f = new FormData()
    f.append("image", photo)
    f.append("name", HotelName)
    f.append("about", Title)
    f.append("facility", JSON.stringify(facilityState))
    f.append("price", Price)
    f.append("Number_of_rooms", numberRooms)
    f.append("available", availability)
    f.append("house_number", Address)
    f.append("locality", Address1)
    f.append("landmark", landmark)
    f.append("city", City)
    f.append("state", stateName)
    f.append("country", Country)
    f.append("pincode", PinCode)
    f.append("phone", PhoneNumber)
    f.append("email", Email)
    f.append("bestfor", Description)
    f.append("owner_id",parseInt(user_id))

    console.log(f)


    let result =  fetch(`http://100.26.11.43/bnb/roomAPI/` + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: f
    })
      .then(res => res.json())
      .then(res => res.id ? (alert("Room Updated Successfully!"), navigation.goBack()) : (console.log(res), alert("Something Went Wrong, Please Check all fields are filled.")))
      .catch(error => alert(error), "no");

  };

  return (

    <View>

      <View style={{ backgroundColor: "black" }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }} >
          <MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="arrow-left" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.tetxStyle}>Room Image</Text>
          <TouchableOpacity onPress={pickImage} style={{ borderRadius: 2, borderColor: "rgb(204, 204, 204)", borderWidth: 1 }} >
            <ImageBackground source={backgroundImage} style={styles.imgStyle} >
              {image && <Image resizeMode='cover' source={{ uri: image }} style={{ width: "100%", height: 200 }} />}
            </ImageBackground>
          </TouchableOpacity>


          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="Room Name"
            // value={HotelName}
            defaultValue={HotelName}
            onChangeText={(text) => { setHotelName(text) }}
          />

          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="About"
            defaultValue={Title}
            onChangeText={(text) => { setTitle(text) }}
          />

          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="Bed For"
            defaultValue={Description}
            onChangeText={(text) => { setDescription(text) }}
          />



          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="Price"
            defaultValue={Price}
            onChangeText={(text) => { setPrice(text) }}
          />

          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="Phone Number"
            defaultValue={PhoneNumber}
            onChangeText={(text) => { setPhoneNUmber(text) }}
          />


          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="Email"
            defaultValue={Email}
            onChangeText={(text) => { setEmail(text) }}
          />

          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="House/Flat Number"
            defaultValue={Address}
            onChangeText={(text) => { setAddress(text) }}
          />

          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="Locality"
            defaultValue={Address1}
            onChangeText={(text) => { setAddress1(text) }}
          />

          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="Landmark (Optional)"
            defaultValue={landmark}
            onChangeText={(text) => { setLandmark(text) }}
          />

          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="City"
            defaultValue={City}
            onChangeText={(text) => { setCity(text) }}
          />

          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="State"
            defaultValue={stateName}
            onChangeText={(text) => { setStateName(text) }}
          />

          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="Country"
            defaultValue={Country}
            onChangeText={(text) => { setCountry(text) }}
          />

          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="Pin Code"
            defaultValue={PinCode}
            onChangeText={(text) => { setPinCode(text) }}
          />

          <TextField
            labelFontSize={15}
            tintColor="orange"
            baseColor="#17baa1"
            label="Number of Rooms"
            defaultValue={numberRooms}
            onChangeText={(text) => { setNumberRooms(text) }}
          />

          <Text style={{ color: "#17baa1", fontSize: 18, marginTop: 20 }}>
            Facilities
          </Text>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ width: "100%" }}>

              {Facility_data.map((item,index, key) => <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginTop: 10, width: "50%" }}>
                {/* <CheckBox
                  disabled={false}
                  value={ facilityState.find((itm) => itm.id === item.id  )}
                  onValueChange={() => functionFacility(item)}
                /> */}
                <View style={{ width: "75%" }}>
                  <Text>{item.name}</Text>
                </View>
              </View>
              )}


            </View>
          </View>

          <Text style={{ color: "#17baa1", fontSize: 18, marginTop: 20 }}>
            Availability
          </Text>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ width: "100%" }}>

              <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', width: "50%" }}>
                {/* <CheckBox
                  disabled={false}
                  value={availability}
                  onValueChange={() => setAvailability(availability ? false : true)}
                /> */}
                <View style={{ width: "75%" }}>
                  <Text>Room Available</Text>
                </View>
              </View>
            </View>
          </View>



          <View style={[styles.buttonView]}>

            <TouchableOpacity style={styles.button} onPress={Postdata}>

              <Text style={[styles.buttonText]}>Update</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </View >

  )
}
export default UpdateBookCount

const styles = {
  imgStyle: {
    width: "100%",
    height: 200,

    backgroundColor: "#fff",
    borderRadius: 2,
    // elevation:3

  },
  mainContainer: {
    marginBottom: 40,
    // alignItems:"center"
    backgroundColor: "#fff",
  },
  container: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 3,
    borderColor: "rgb(204, 204, 204)",
    backgroundColor: "rgb(245, 245, 245)",
    padding: 15,
    elevation: 3

  },
  tetxStyle: {
    fontSize: 15,
    color: "#17baa1",
    margin: 5
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "rgb(204, 204, 204)",
    backgroundColor: "#fff",
    padding: 5
  },
  pickerContainer: {
    // backgroundColor: "#dfdfdf"

  },

  button: {
    width: 120,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'orange',
    marginTop: 15

    // backgroundColor: 'black'
  },

  buttonText: {
    // fontFamily: 'AdobeClean-Regular',
    fontSize: 16,
    letterSpacing: 1.25,
    color: '#fff',
  },

  buttonView: {
    alignSelf: 'center',
    marginTop: 10,
    padding: 10,
  },

}
