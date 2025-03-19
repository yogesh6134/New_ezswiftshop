// import React from 'react';
// import { View, Dimensions, Text, Button, Image, TextInput, Alert, Modal, StyleSheet, TouchableHighlight, TouchableOpacity, BackHandler, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// // import Constants from 'expo-constants';
// // import * as Permissions from 'expo-permissions';
// // import { TextInput } from 'react-native-material-textfield';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { RadioButton } from 'react-native-paper';
// import MapView from 'react-native-maps';
// // import * as Location from 'expo-location';
// // import * as Permissions from "expo-permissions";
// // import { googleGeocodeAsync } from 'expo-location/build/LocationGoogleGeocoding';
// import { getDistance } from 'geolib';
// import GetLocation from 'react-native-get-location';
// import { Marker } from 'react-native-maps';

// const LOCATION_TASK_NAME = "background-location-task";

// const ShippingAddress = (props) => {

//     // state variables
//     const [name, setName] = React.useState("")
//     const [Addressline1, setAddressline1] = React.useState("")
//     const [Addressline2, setAddressline2] = React.useState("")
//     const [landmark, setLandmark] = React.useState("")
//     const [City, setCity] = React.useState("")
//     const [State, setState] = React.useState("")
//     const [Country, setCountry] = React.useState("")
//     const [Zipcode, setZipcode] = React.useState("")
//     const [token, setToken] = React.useState("")
//     const [phone_number, setphonenumber] = React.useState("")
//     const [alternate_phone_number, setAltphonenumber] = React.useState("")
//     const [id, setId] = React.useState("")
//     const [error, setError] = React.useState("")
//     const [loading, setLoading] = React.useState(true)
//     const [modalVisible, setmodalVisible] = React.useState(false)
//     const [mapOpen, setmapOpen] = React.useState(false)
//     const [marker, setMarker] = React.useState({ latitude: 0.5423, longitude: 0.5232 }) // static value
//     const [region, setRegion] = React.useState(null)
//     const [coordinates, setCoordinates] = React.useState({ latitude: 0.5423, longitude: 0.5232 }) // static value
//     const [data, setData] = React.useState([])
//     const [location, setLocation] = React.useState([])
//     // const [position, set] = React.useState([])
//     const [distance, setDistance] = React.useState(0)

//     // usestate
//     React.useEffect(() => {
//         // BackHandler.addEventListener('hardwareBackPress', () => handleBackButtonClick());
//         getTokenhandler()
//         // _getLocationAsync();
//         CurrentLocation();


//     }, []);

//     const CurrentLocation = async () => { 
//         GetLocation.getCurrentPosition({
//             enableHighAccuracy: true,
//             timeout: 15000,
//         })
//         .then(location => {
//             // console.log("g",location);
//             let region = {
//                             latitude: location.latitude,
//                             longitude: location.longitude,
//                             latitudeDelta: 0.0025,
//                             longitudeDelta: 0.0025
//                         };
//                         setRegion(region)
//         })

//         .catch(error => {
//             const { code, message } = error;
//             console.warn(code, message);
//         })
//     };








//     const getTokenhandler = async () => {
//         let token = await AsyncStorage.getItem('token')
//         // this.setState({ token: token })
//         setToken(token)
//         let res = await axios.get("http://54.163.88.91/address/list/", {
//             headers: { Authorization: token }
//         })
//         // alert(res.data)
//         // this.setState({ data: res.data })
//         setData(res.data)
//         // this.setState({ loading: false })
//         setLoading(false)
//     }

//     const onPostHandler = async () => {
//         setLoading(true)
//         let res = await axios.post("http://54.163.88.91/address/",
//             {
//                 name: name,
//                 address_line_1: Addressline1,
//                 address_line_2: Addressline2,
//                 landmark: landmark,
//                 city: City,
//                 state: State,
//                 country: Country,
//                 zip_code: Zipcode,
//                 phone_number: phone_number,
//                 alternate_phone_number: alternate_phone_number,
//                 latitude: marker.latitude,
//                 longitude: marker.longitude

//             },
//             {
//                 headers: { Authorization: token }
//             }
//         )
//         if (res.data.status === 201) {
//             props.navigation.navigate("checkout", { id: "None", distance: distance })
//             // console.log('address posted')
//         } else {
//             setLoading(false)
//             // console.log(res.data)
//         }
//     };

//     const previousAddressProceed = async () => {
//         setLoading(true)
//         if (id == "") {
//             alert("Please Select An Address")
//             setLoading(false)
//         } else {
//             props.navigation.navigate("checkout", { id: id, distance: distance })
//         }

//     };

//     const CalculateDistance = () => {
//         // let gps1=new google.maps.Lating(this.state.region.latitude,this.state.region.longitude)
//         // let gps2=new google.maps.Lating(this.state.marker.latitude,this.state.marker.longitude)

//         // let distanceinmetre=google.maps.geometry.spherical.computeDistanceBetween(gps1,gps2)
//         // console.log('distance in meter',distanceinmetre)
//         let distance = getDistance(
//             coordinates,
//             marker
//         );
//         // this.setState({distance:getDistance(
//         //   this.state.coordinates,
//         //   this.state.marker
//         // )
//         // })
//         // console.log(distance)
//         setDistance(1234) // static distance
//     };

//     const addressMapHandler = () => {
//         const count = 0;
//         return data.slice(0, 5).map((t, key) => {
//             if (count < 5) {
//                 return (

//                     <TouchableOpacity key={key} onPress={() => setId(t.id)}
//                         style={{ alignItems: "center", flexDirection: "row", margin: 20 }}>

//                         <RadioButton
//                             value={t.id}
//                             status={id == t.id ? 'checked' : 'unchecked'}
//                             onPress={() => setId(t.id)}
//                         />
//                         <View style={{ flexDirection: "column" }}>
//                             <Text style={{ color: "orange" }}> {t.name},</Text>
//                             <Text style={{ color: "pink" }}> {t.address_line_1},</Text>
//                             <Text style={{ color: "black" }}> {t.zip_code},</Text>
//                             <Text style={{ color: "green" }}> {t.city},</Text>
//                             <Text style={{ color: "blue" }}> {t.phone_number}</Text>
//                         </View>
//                     </TouchableOpacity>
//                 )
//             }
//         })
//     };


//     // component rendering
//     if (loading) {
//         return (
//             <View style={{ flex: 1 }}>
//                 <View style={styles.activitycontainer}>
//                     <View style={styles.activityStyle}>
//                         <ActivityIndicator size="large" color="#17baa1" />
//                         <StatusBar barStyle="default" />
//                     </View>
//                 </View>
//             </View>
//         )
//     }
//     else {
//         return (
//             <View style={{ flex: 1 }}>
//                 <View style={{ flexDirection: "row", height: 50, padding: 10, justifyContent: "flex-start", backgroundColor: "black" }}>
//                     <MaterialCommunityIcons
//                         onPress={() => { props.navigation.goBack() }}
//                         name="arrow-left" color="#fff" size={25} />
//                     <Text style={{ marginLeft: 20, fontSize: 20, color: "#fff" }}>
//                         Add Address
//                     </Text>
//                 </View>
//                 <ScrollView style={styles.mainContainer}>
//                     <View>
//                         {addressMapHandler()}
//                         <TouchableOpacity style={{ marginTop: 20, marginBottom: 20 }} >
//                             <Button color="orange" title="post"
//                                 onPress={() => { previousAddressProceed() }} />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.container}>
//                           <TextInput
//                         placeholderTextColor="#a5a5a5" 
//                             // labelFontSize={15}
//                             // tintColor="orange"
//                             // baseColor="#17baa1"
//                             placeholder="Name"
//                             fontSize={15}

//                             value={name}
//                             onChangeText={value => setName(value)} />

//                           <TextInput
//                         placeholderTextColor="#a5a5a5" 
//                             // labelFontSize={15}
//                             // tintColor="orange"
//                             // baseColor="#17baa1"
//                             placeholder="Address line 1"
//                             fontSize={15}

//                             value={Addressline1}
//                             onChangeText={value => setAddressline1(value)} />

//                           <TextInput
//                         placeholderTextColor="#a5a5a5" 
//                             // labelFontSize={15}
//                             // tintColor="orange"
//                             // baseColor="#17baa1"
//                             placeholder="Address line 2 (Optional)"
//                             fontSize={15}

//                             value={Addressline2}
//                             onChangeText={value => setAddressline2(value)} />

//                           <TextInput
//                         placeholderTextColor="#a5a5a5" 
//                             // labelFontSize={15}
//                             // tintColor="orange"
//                             // baseColor="#17baa1"
//                             placeholder="Landmark (Optional)"
//                             fontSize={15}

//                             value={landmark}
//                             onChangeText={value => setLandmark(value)} />

//                           <TextInput
//                         placeholderTextColor="#a5a5a5" 
//                             // labelFontSize={15}
//                             // tintColor="orange"
//                             // baseColor="#17baa1"
//                             placeholder="City"
//                             fontSize={15}

//                             value={City}
//                             onChangeText={value => setCity(value)} />

//                           <TextInput
//                         placeholderTextColor="#a5a5a5" 
//                             // labelFontSize={15}
//                             // tintColor="orange"
//                             // baseColor="#17baa1"
//                             placeholder="State"
//                             fontSize={15}

//                             value={State}
//                             onChangeText={value => setState(value)} />

//                           <TextInput
//                         placeholderTextColor="#a5a5a5" 
//                             // labelFontSize={15}
//                             // tintColor="orange"
//                             // baseColor="#17baa1"
//                             placeholder="Country"
//                             fontSize={15}

//                             value={Country}
//                             onChangeText={value => setCountry(value)} />


//                           <TextInput
//                         placeholderTextColor="#a5a5a5" 
//                             // labelFontSize={15}
//                             // tintColor="orange"
//                             // baseColor="#17baa1"
//                             placeholder="Zipcode"
//                             fontSize={15}

//                             value={Zipcode}
//                             onChangeText={value => setZipcode(value)} />

//                           <TextInput
//                         placeholderTextColor="#a5a5a5" 
//                             // labelFontSize={15}
//                             // tintColor="orange"
//                             // baseColor="#17baa1"
//                             placeholder="Phone Number"
//                             fontSize={15}

//                             value={phone_number}
//                             onChangeText={value => setphonenumber(value)} />

//                           <TextInput
//                         placeholderTextColor="#a5a5a5" 
//                             // labelFontSize={15}
//                             // tintColor="orange"
//                             // baseColor="#17baa1"
//                             placeholder="Alernate Number(Optional)"
//                             fontSize={15}

//                             value={alternate_phone_number}
//                             onChangeText={value => setAltphonenumber(value)} />

//                         <View style={styl.centeredView}>
//                             <Modal
//                                 animationType="slide"
//                                 transparent={true}
//                                 visible={modalVisible}
//                                 onRequestClose={() => {
//                                     setmodalVisible(false)
//                                     Alert.alert('Modal has been closed.');
//                                 }}>
//                                 <View style={styl.centeredView}>

//                                     <View style={styl.modalView}>
//                                         <Text style={{ fontWeight: 'bold', marginLeft: '30%', marginBottom: 5 }}>Tap or Drag to set marker</Text>
//                                         {/* <MapView
//                                             region={this.state.region}
//                                             onRegionChange={this.onRegionChange}
//                                         >
//                                             {this.state.markers.map((marker, index) => (
//                                                 <Marker
//                                                     key={index}
//                                                     coordinate={marker.latlng}
//                                                     title={marker.title}
//                                                     description={marker.description}
//                                                 />
//                                             ))}
//                                         </MapView> */}
//                                         {<MapView
//                                             initialRegion={region}
//                                             showsCompass={true}
//                                             showsUserLocation={true}
//                                             rotateEnabled={true}
//                                             ref={map => {
//                                                 this.map = map;
//                                             }}
//                                             style={styl.map}
//                                             onPress={e => setMarker(e.nativeEvent.coordinate)}>
//                                             {
//                                                 marker &&
//                                                 <MapView.Marker coordinate={marker}
//                                                     title={"Pinned Location"}
//                                                     draggable
//                                                     onDragEnd={(e) => {
//                                                         console.log(e.nativeEvent.coordinate)
//                                                         setMarker(e.nativeEvent.coordinate)
//                                                         console.log(marker)
//                                                     }}
//                                                 >
//                                                     <Image source={require('../assets/pin.png')} resizeMode={"contain"} style={{ width: 13, height: 35 }} />


//                                                 </MapView.Marker>
//                                             }



//                                         </MapView>}

//                                         <TouchableHighlight
//                                             style={{ ...styl.openButton, backgroundColor: '#2196F3' }}
//                                             onPress={() => {
//                                                 setmodalVisible(false)
//                                                 CalculateDistance()
//                                             }}>
//                                             <Text style={styl.textStyle}>Done</Text>
//                                         </TouchableHighlight>
//                                     </View>
//                                 </View>
//                             </Modal>

//                             <TouchableHighlight
//                                 style={{ ...styl.openButton, backgroundColor: 'mediumseagreen' }}
//                                 onPress={() => {
//                                     setmodalVisible(true)
//                                     setmapOpen(true)
//                                 }}>
//                                 <Text style={{ ...styl.textStyle }}>Pin Your Location On Map</Text>
//                             </TouchableHighlight>
//                         </View>
//                         {mapOpen ?
//                             (<TouchableOpacity style={{ marginTop: 10, marginBottom: 20 }} >
//                                 <Button color="orange" title='Post'
//                                     onPress={() => onPostHandler()} />
//                             </TouchableOpacity>)

//                             : (<Text></Text>)

//                         }

//                     </View>
//                 </ScrollView>
//             </View>
//         )
//     }
// };

// const styles = {
//     activityStyle: {
//         padding: 30,
//         // borderWidth:1,
//         borderRadius: 5,
//         backgroundColor: "#fff",
//         borderColor: "#17baa1"

//     },
//     activitycontainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     mainContainer: {
//         flex: 1,
//         padding: 8,
//         // alignItems:"center"
//         backgroundColor: "#fff",
//     },
//     container: {
//         borderWidth: 1,
//         marginBottom: 20,
//         borderRadius: 3,
//         borderColor: "rgb(204, 204, 204)",
//         backgroundColor: "rgb(245, 245, 245)",
//         padding: 15
//     },
//     tetxStyle: {
//         fontSize: 20,
//         fontWeight: "bold",
//         margin: 5
//     },
//     inputStyle: {
//         borderWidth: 1,
//         borderRadius: 3,
//         borderColor: "rgb(204, 204, 204)",
//         backgroundColor: "#fff",
//         padding: 5
//     }

// }
// const styl = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         // justifyContent: 'center',
//         // alignItems: 'center',
//         marginTop: 22,
//     },
//     modalView: {
//         width: '90%',
//         height: '80%',
//         margin: 20,
//         marginTop:35,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 5,
//         // alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
//     openButton: {
//         backgroundColor: '#F194FF',
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2,
//     },
//     textStyle: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     modalText: {
//         // marginBottom: 15,
//         textAlign: 'center',
//         backgroundColor: 'red'
//     },
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '80%',
//         height: '100%'
//     },
//     map: {

//         // width: (Dimensions.get('window').width)-100,
//         // height: (Dimensions.get('window').height)-100,
//         // marginBottom:5,
//         width: '100%',
//         height: '90%',
//         marginBottom: 5

//     }
// });

// export default ShippingAddress;


import React from 'react';
import { Text, View } from 'react-native';

const ShippingAddress = ({params}) => (
    <View>
        <Text>ShippingAddress</Text>
    </View>
);

export default ShippingAddress;
