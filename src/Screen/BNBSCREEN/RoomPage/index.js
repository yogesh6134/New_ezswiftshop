import React, { useState, useEffect } from 'react';
import { Alert, Picker, Image, Dimensions, FlatList, View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, NativeEventEmitter, NativeModules } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// var backgroundImage = require("../assets/Screenshot_20200703-173531.png")
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CheckBox from '@react-native-community/checkbox';
import NumericInput from 'react-native-numeric-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-simple-toast';
import Tts from 'react-native-tts';



const { height, width } = Dimensions.get('window');

const RoomPage = ({ navigation, route }) => {


    const { hotelid } = route.params
    const { room_id } = route.params;
    const [paymentid, setpaymentid] = useState()
    // alert(paymentid)

    // alert(hotelid)
    // const { id } = route.params;

    const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
	ee.addListener('tts-start', () => {});
	ee.addListener('tts-finish', () => {});
	ee.addListener('tts-cancel', () => {});


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const checkout_handleConfirm = (date) => {
        // console.warn(date)
        // setcheckout_date(JSON.stringify(date));
        var d = JSON.stringify(date).slice(1, 11);
        // var t= JSON.stringify(date).slice(12,17);
        // console.log(d+" "+t);
        var finaldate = d;
        setcheckout_date(JSON.stringify(d));
        // alert(date)
        hideDatePicker();

    };


    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);

    const showDatePicker1 = () => {
        setDatePickerVisibility1(true);
    };

    const hideDatePicker1 = () => {
        setDatePickerVisibility1(false);
    };


    const checkin_handleConfirm1 = (date) => {
        console.log(date)

        // alert(checkin_date)

        var d = JSON.stringify(date).slice(1, 11);
        // var t= JSON.stringify(date).slice(12,17);
        // console.log(d+" "+t);
        var finaldate = d;
        setcheckin_date(JSON.stringify(d));
        // document.getElementById("setcheckin_date").innerHTML = .substring(7,13);

        // alert(date)
        hideDatePicker1();
    };



    // API For Post Method
    // const [outdate, setoutdate] = useState()
    // const [indate, setindate] = useState()
    // const [checkout, setcheckout] = useState(true)


    // API
    const [checkin_date, setcheckin_date] = useState('')
    const [checkout_date, setcheckout_date] = useState('')
    const [RoomCheckBox, setRoomCheckBox] = useState([])

    const [image, setImage] = useState(null);
    const [selectedValue, setSelectedValue] = useState("");
    const [HotelName, setHotelName] = useState('');
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState();
    // const [isactive, setPrice] = useState('');
    const [Price, setPrice] = useState('');



    //API

    const [Address, setAddress] = useState('');
    const [Address1, setAddress1] = useState('');
    const [landmark, setLandmark] = useState('');
    const [stateName, setStateName] = useState('');
    const [City, setCity] = useState('')
    const [Country, setCountry] = useState('')
    const [PinCode, setPinCode] = useState('')
    const [PhoneNumber, setPhoneNUmber] = useState('')
    const [email, setemail] = useState('');
    const [selectRoom, setselectRoom] = useState(0)
    const [hotelId, setHotelId] = useState(0)
    // const date = "12/16/1900"
    // const [month, day, year] = date.split('/')





    const [data, setdata] = useState('');

    useEffect(() => {
        getdata()
        return () => { };
    }, []);




    const getdata = async () => {
        const token = await AsyncStorage.getItem('token')

        const requestOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: token,
            },
        };

        fetch(`http://100.26.11.43/bnb/roomAPI/` + room_id, requestOptions)
            .then(res => res.json())
            .then(resData => {
                console.log(resData)
                // console.log(JSON.stringify(resData))
                setHotelId(resData.id)
                setHotelName(resData.name);
                setImage(resData.image);
                setTitle(resData.title);
                setDescription(resData.about);
                setSelectedValue(resData.bestfor);
                // setFitnessCheckBox(resData.is_fitness_area);
                // setParkingCheckBox(resData.is_parking);
                // setSpaCheckBox(resData.is_spa_area);
                // setSwimmingCheckBox(resData.is_swimming_pool);
                setRoomCheckBox(JSON.parse(resData.facility));
                setPhoneNUmber(resData.phone)
                setPinCode(resData.pincode)
                // setWifiCheckBox(resData.is_wifi);
                setPrice(JSON.stringify(resData.price));
                setAddress(resData.house_number)
                setAddress1(resData.locality)
                setCity(resData.city)
                setStateName(resData.state)
                setLandmark(resData.landmark)
                setCountry(resData.country)
                setemail(resData.email)
                setPrice(resData.price)
                // alert(WifiCheckBox)

                // alert(JSON.stringify(resData))
                // alert(JSON.stringify(resData.SpaCheckBox))
                // setHotelName(resData[0].hotel_name)
            })
            .catch(error => alert(error));
    };


    const postdata = async () => {
        const token = await AsyncStorage.getItem('token')
        const user_id = await AsyncStorage.getItem('user_id')
        const firstDate = new Date(checkin_date.slice(1, 11));
        const secondDate = new Date(checkout_date.slice(1, 11));
        const days = Math.round((secondDate - firstDate) / (1000 * 60 * 60 * 24))
        const totalprice = days * Price
        const body = {

            checkin: checkin_date.slice(1, 11),
            checkout: checkout_date.slice(1, 11),
            bill_amount: totalprice,
            available: true,
            user: parseInt(user_id),
            room: hotelId
        }
        
        
        if (body.no_of_rooms == 0) {
            // Toast.show("Please select numbers of rooms.")
        } else if (body.check_in == "") {
            // Toast.show("Please select Check In date.")
        } else if (body.check_out == "") {
            // Toast.show("Please select Check Out date.")
        } else {
        Tts.speak("Total amount is"+totalprice+"dollars ")
        Alert.alert(
            "Confirm Booking",
            "Are you sure, you want to Confirm Booking?",
            [
               
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              }, {
                text: "Ok",
                onPress: () => {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            Authorization: token,
                        },
                        body: JSON.stringify(body),
                    };
                    fetch('http://100.26.11.43/bnb/roombookingAPI/', requestOptions)
                        .then(res => res.json())
                        .then(res => {
                            console.log(res,"yes")
                            // alert(JSON.stringify(res));
                            // setpaymentid(res.id);
                            // alert(paymentid)
                            navigation.navigate('PaymentMethodHotel', {  order_id: res.id })
                        })
                        .catch(error => alert(error));
                },
                style: "ok",
              }
            ]
          );
           
        }
    };

    return (

        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>

                <View style={styles.image}>
                    <Image
                        source={{
                            uri: image
                        }}
                        style={{ height: 200, width: '100%' }}
                        resizeMode='cover'
                    >
                    </Image>
                </View>
                <View style={styles.fieldset}>
                    <Text style={styles.itemTitle}>{Title}</Text>


                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Icon color="orange" name="location" size={20} style={{ marginTop: 10 }} />
                        <Text style={styles.itemlocation} > {City}</Text>
                    </View>



                    {/* <Text style={styles.itemTitle}>Price</Text> */}

                    <Text style={styles.itemPrice}>${Price}</Text>
                    <Text style={styles.itemText}>{HotelName} </Text>




                    <View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.itemDescription}>Description</Text>
                            <Text style={styles.roomstyle}>{Description}</Text>
                        </View>


                        <View>
                            <Text style={styles.itemRoomtype}>Bed For</Text>
                            <Text style={styles.roomstyle}>{selectedValue}</Text>
                        </View>
                    </View>

                    <Text style={styles.itemFeatured}>Facility </Text>


                    <View style={{ marginTop: 5, width: "100%" }}>
                        {RoomCheckBox.map((item) =>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <Text>{item.name}</Text>
                            </View>
                        )}
                    </View>
                    <View style={{ marginTop: 10, width: "100%" }}>
                        <View >
                            <Text style={styles.itemDescription}>Hotel Address</Text>
                            <Text style={styles.roomstyle}>{Address}</Text>
                            <Text style={styles.roomstyle}>{Address1}</Text>
                            <Text style={styles.roomstyle}>{landmark}</Text>
                            <Text style={styles.roomstyle}>{City}</Text>
                            <Text style={styles.roomstyle}>{stateName}</Text>
                            <Text style={styles.roomstyle}>{Country}</Text>
                            <Text style={styles.roomstyle}>{PinCode}</Text>
                        </View>

                        <View>
                            <Text style={styles.itemDescription}>Hotel Email</Text>
                            <Text style={styles.roomstyle}>{email}</Text>
                        </View>
                        <View>
                            <Text style={styles.itemDescription}>Hotel Phone</Text>
                            <Text style={styles.roomstyle}>{PhoneNumber}</Text>
                        </View>
                    </View>

                    {/* <View>
                        <Text style={styles.itemnumericInput}>
                            Select Number Of Rooms


                        </Text>
                        <NumericInput
                            onChange={text => setselectRoom(text)}
                            textColor='#212121'
                            iconStyle={{ color: 'black' }}
                            rightButtonBackgroundColor='#FFA500'
                            leftButtonBackgroundColor='#FFD580'
                        />
                    </View> */}






                    <View style={{ flexDirection: 'column' }}>
                        <View >
                            <Text style={styles.itemnumericInput}>
                                Check In
                            </Text>
                            <View>
                                <Text> {checkin_date}</Text>
                            </View>
                            <TouchableOpacity  >
                                <View style={styles.button}>
                                    <Text style={[styles.buttonText]} onPress={showDatePicker1} >Check In</Text>
                                </View>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible1}
                                    mode="date"


                                    onConfirm={checkin_handleConfirm1}
                                    onCancel={hideDatePicker1}
                                />
                            </TouchableOpacity>
                        </View>


                        <View >
                            <Text style={styles.itemnumericInput}>
                                Check Out
                            </Text>
                            <View>
                                <Text> {checkout_date}</Text>
                            </View>
                            <TouchableOpacity style={styles.button} >

                                <Text style={[styles.buttonText]} onPress={showDatePicker} >Check Out</Text>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={checkout_handleConfirm}
                                    onCancel={hideDatePicker}



                                />
                            </TouchableOpacity>
                        </View>
                    </View>



                    {/* <Text style={styles.itemTitle}>Price - $100</Text> */}

                    <View style={[styles.buttonView]}>

                        <TouchableOpacity style={styles.submitbutton} onPress={postdata} >

                            <Text style={[styles.buttonText]}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </ScrollView >


    );
};

export default RoomPage;


const styles = {
    container: {
        backgroundColor: '#f0f0f0',
    },

    headerText: {
        color: 'black',
        fontFamily: 'AdobeClean-Bold',
    },

    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#55BCF6'
    },

    fieldset: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10
    },

    itemText: {
        fontSize: 35,
        fontWeight: '400',
        width: '90%',
        color: '#17baa1',
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey'
    },

    itemTitle: {
        fontSize: 30,
        fontWeight: '400',
        letterSpacing: 1.15,
        color: 'green',
        fontWeight: '500',
        marginTop: 20
    },

    itemPrice: {
        fontSize: 30,
        fontWeight: '400',
        letterSpacing: 1.15,
        color: 'green',
        fontWeight: '500',
        marginTop: 10
    },

    itemlocation: {
        fontSize: 20,
        fontWeight: '400',
        width: '90%',
        color: 'black',
        marginTop: 10,
    },

    itemFeatured: {
        fontSize: 25,
        fontWeight: '400',
        width: '90%',
        color: 'black',
        marginTop: 20,
    },

    itemDescription: {
        fontSize: 25,
        color: 'black',
        marginTop: 20,
        fontWeight: '400'

    },

    itemRoomtype: {
        fontSize: 25,
        color: 'black',
        marginTop: 20,
        fontWeight: '400'
    },

    roomstyle: {
        fontSize: 15,
        color: 'black',
        marginTop: 5

    },



    button: {
        width: 100,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: 'orange',
    },

    buttonText: {
        fontSize: 16,
        letterSpacing: 1.25,
        color: '#fff',
    },

    buttonView: {
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        // flexDirection: 'column'

    },



    itemnumericInput: {

        fontSize: 25,
        color: 'black',
        marginTop: 15

    },

    submitbutton: {

        width: '100%',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: 'green',
        marginTop: 15
    },



    bigTile: {
        fontFamily: 'AdobeClean-Regular',
        width: width - 200,
        height: '5%',
        backgroundColor: '#F0F0F0',
        marginTop: 20,
        marginLeft: 20,

        elevation: 3,
    },

    largetextInput: {
        width: '100%',
        backgroundColor: '#F0F0F0',
    },




};



