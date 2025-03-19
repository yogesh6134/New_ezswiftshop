import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require("../assets/Screenshot_20200703-173531.png");

const AllHotelDetails = ({ navigation, route }) => {
    const id = route.params.id; // Updated to get param from route directly

    const [HotelName, setHotelName] = useState('');
    const [Address, setAddress] = useState('');
    const [Address1, setAddress1] = useState('');
    const [City, setCity] = useState('');
    const [Country, setCountry] = useState('');
    const [PinCode, setPinCode] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [Description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const token = await AsyncStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        };

        fetch(`http://100.26.11.43/bnb/hotel/detail`, requestOptions)
            .then(res => res.json())
            .then(resData => {
                setHotelName(resData.hotel_name);
                setAddress(resData.address);
                setAddress1(resData.address1);
                setCity(resData.city);
                setCountry(resData.country);
                setPinCode(JSON.stringify(resData.pin_code));
                setPhoneNumber(resData.phone_num);
                setEmail(resData.email);
                setDescription(resData.description);
                setImage(resData.hotel_image);
            })
            .catch(error => console.log(error));
    };

    const pickImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.uri) {
                setImage(response.uri);
            }
        });
    };

    return (
        <View>
            <View style={{ backgroundColor: "black" }}>
                <TouchableOpacity onPress={() => { navigation.navigate('profile') }}>
                    <MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="arrow-left" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.mainContainer}>
                <View style={styles.container}>
                    <Text style={styles.tetxStyle}>Hotel image</Text>
                    <TouchableOpacity onPress={pickImage} style={{ borderRadius: 2, borderColor: "rgb(204, 204, 204)", borderWidth: 1 }}>
                        <ImageBackground source={backgroundImage} style={styles.imgStyle}>
                            {image && <Image source={{ uri: image }} style={{ width: 307, height: 200, resizeMode: 'cover' }} />}
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* Form Fields */}
                    {renderTextInput("Full Name / Company Name *", HotelName, setHotelName)}
                    {renderTextInput("Address *", Address, setAddress)}
                    {renderTextInput("Address1 *", Address1, setAddress1)}
                    {renderTextInput("City *", City, setCity)}
                    {renderTextInput("Country *", Country, setCountry)}
                    {renderTextInput("PinCode *", PinCode, setPinCode)}
                    {renderTextInput("Phone Number *", PhoneNumber, setPhoneNumber)}
                    {renderTextInput("Email *", email, setEmail)}
                    {renderTextInput("Description *", Description, setDescription)}
                </View>
            </ScrollView>
        </View>
    );
};

const renderTextInput = (label, value, onChangeText) => (
    <View style={styles.fieldSet}>
        <Text style={[styles.legend, styles.text]}>{label}</Text>
        <TextInput
            style={[styles.TextInput, styles.text]}
            value={value}
            onChangeText={onChangeText}
        />
    </View>
);

export default AllHotelDetails;

const styles = {
    imgStyle: {
        width: 306,
        height: 200,
        backgroundColor: "#fff",
        borderRadius: 2,
    },
    mainContainer: {
        marginBottom: 40,
        backgroundColor: "#fff",
    },
    container: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 3,
        borderColor: "rgb(204, 204, 204)",
        backgroundColor: "rgb(245, 245, 245)",
        padding: 15,
        elevation: 3,
    },
    tetxStyle: {
        fontSize: 15,
        color: "#17baa1",
        margin: 5,
    },
    fieldSet: {
        borderBottomWidth: 1,
        borderColor: '#17baa1',
        maxWidth: '100%',
        height: 65,
        marginBottom: 10,
    },
    legend: {
        position: 'absolute',
        top: 10,
        left: 7,
        fontWeight: 'bold',
        fontSize: 14,
        color: '#17baa1',
    },
    TextInput: {
        width: '100%',
        height: 40,
        fontSize: 20,
        fontWeight: '400',
    },
};
