import React, { useState } from 'react';
import { Button, Image, View, Text, TouchableOpacity, ScrollView, FlatList, ImageBackground, StyleSheet, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { TextInput } from 'react-native-paper'; // Use Paper for a better TextInput
import { launchImageLibrary } from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox'; // Use community checkbox
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Facility_data = [
    { id: 1, name: "Wifi" },
    { id: 2, name: "Room Service" },
    { id: 3, name: "Swimming Pool" },
    { id: 4, name: "Parking" },
    { id: 5, name: "Gym Area" },
    { id: 6, name: "Spa Area" },
];

const BookCount = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [numberRooms, setNumberRooms] = useState("");
    const [HotelName, setHotelName] = useState('');
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState('');
    const [Address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [Address1, setAddress1] = useState('');
    const [City, setCity] = useState('');
    const [stateName, setStateName] = useState('');
    const [Country, setCountry] = useState('');
    const [PinCode, setPinCode] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Email, setEmail] = useState('');
    const [facilityState, setFacilityState] = useState([]);
    const [availability, setAvailability] = useState(false);

    const pickImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setImage(response.assets[0].uri);
            }
        });
    };

    const functionFacility = (val) => {
        const newIds = [...facilityState];
        const index = facilityState.findIndex(item => item.id === val.id);
        if (index > -1) {
            newIds.splice(index, 1);
        } else {
            newIds.push(val);
        }
        setFacilityState(newIds);
        console.log(JSON.stringify(newIds));
    };

    const Postdata = async () => {
        const user_id = await AsyncStorage.getItem('user_id');
        let photo = {
            uri: image,
            name: "image1.jpg",
            type: 'image/jpeg',
        };
        let f = new FormData();
        f.append("image", photo);
        f.append("name", HotelName);
        f.append("about", Title);
        f.append("facility", JSON.stringify(facilityState));
        f.append("price", Price);
        f.append("Number_of_rooms", numberRooms);
        f.append("available", availability);
        f.append("house_number", Address);
        f.append("locality", Address1);
        f.append("landmark", landmark);
        f.append("city", City);
        f.append("state", stateName);
        f.append("country", Country);
        f.append("pincode", PinCode);
        f.append("phone", PhoneNumber);
        f.append("email", Email);
        f.append("bestfor", Description);
        f.append("owner_id", parseInt(user_id));

        console.log(f);

        fetch(`http://100.26.11.43/bnb/roomAPI/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: f,
        })
            .then(res => res.json())
            .then(res => res.id ? (alert("Room created Successfully!"), navigation.goBack()) : (console.log(res), alert("Something Went Wrong, Please Check all fields are filled.")))
            .catch(error => alert(error));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <MaterialCommunityIcons style={styles.backIcon} size={25} name="arrow-left" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.mainContainer}>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Room Image</Text>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        <ImageBackground source={require("../assets/Screenshot_20200703-173531.png")} style={styles.imgStyle}>
                            {image && <Image resizeMode='cover' source={{ uri: image }} style={styles.image} />}
                        </ImageBackground>
                    </TouchableOpacity>

                    <TextInput
                        label="Room Name"
                        value={HotelName}
                        onChangeText={setHotelName}
                        style={styles.input}
                    />
                    <TextInput
                        label="About"
                        value={Title}
                        onChangeText={setTitle}
                        style={styles.input}
                    />
                    <TextInput
                        label="Bed For"
                        value={Description}
                        onChangeText={setDescription}
                        style={styles.input}
                    />
                    <TextInput
                        label="Price"
                        value={Price}
                        onChangeText={setPrice}
                        style={styles.input}
                    />
                    <TextInput
                        label="Phone Number"
                        value={PhoneNumber}
                        onChangeText={setPhoneNumber}
                        style={styles.input}
                    />
                    <TextInput
                        label="Email"
                        value={Email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                    <TextInput
                        label="House/Flat Number"
                        value={Address}
                        onChangeText={setAddress}
                        style={styles.input}
                    />
                    <TextInput
                        label="Locality"
                        value={Address1}
                        onChangeText={setAddress1}
                        style={styles.input}
                    />
                    <TextInput
                        label="Landmark (Optional)"
                        value={landmark}
                        onChangeText={setLandmark}
                        style={styles.input}
                    />
                    <TextInput
                        label="City"
                        value={City}
                        onChangeText={setCity}
                        style={styles.input}
                    />
                    <TextInput
                        label="State"
                        value={stateName}
                        onChangeText={setStateName}
                        style={styles.input}
                    />
                    <TextInput
                        label="Country"
                        value={Country}
                        onChangeText={setCountry}
                        style={styles.input}
                    />
                    <TextInput
                        label="Pin Code"
                        value={PinCode}
                        onChangeText={setPinCode}
                        style={styles.input}
                    />
                    <TextInput
                        label="Number of Rooms"
                        value={numberRooms}
                        onChangeText={setNumberRooms}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Facilities</Text>
                    <View style={styles.facilitiesContainer}>
                        {Facility_data.map((item) => (
                            <View key={item.id} style={styles.checkboxContainer}>
                                <CheckBox
                                    value={facilityState.find((itm) => itm.id === item.id) ? true : false}
                                    onValueChange={() => functionFacility(item)}
                                />
                                <Text style={styles.checkboxLabel}>{item.name}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.label}>Availability</Text>
                    <View style={styles.availabilityContainer}>
                        <CheckBox
                            value={availability}
                            onValueChange={() => setAvailability(!availability)}
                        />
                        <Text style={styles.checkboxLabel}>Room Available</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={Postdata}>
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: "black",
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        color: 'white',
        margin: 10,
    },
    mainContainer: {
        padding: 20,
    },
    formContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    label: {
        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        marginVertical: 10,
        backgroundColor: 'white',
    },
    imagePicker: {
        height: 150,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    imgStyle: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    facilitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    checkboxLabel: {
        marginLeft: 8,
    },
    availabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default BookCount;
