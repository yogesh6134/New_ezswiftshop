import React, { useState, useEffect } from 'react';
import { Alert, Image, Dimensions, FlatList, View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, ImageBackground } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
 import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// var backgroundImage = require("../assets/Screenshot_20200703-173531.png")

// const data = [
//     {
//         label: ''
//     },
//     // {
//     //   label: 'Credit Card',
//     // },
//     // {
//     //   label: 'Debit Card',
//     // },
//     // {
//     //   label: 'Internet Banking',
//     // },
// ];


const { height, width } = Dimensions.get('window');

const ViewHistory = ({ navigation, route }) => {

    const id = navigation.getParam('id');
    // const hotel = navigation.getParam('hotel')
    // console.log(userid)
    const [data, setdata] = useState([]);
    // const [userid, setuserid] = useState('')
    const [hotelProfile, sethotelProfile] = useState([]);

    useEffect(() => {
        getdata();
        return () => { };
    });




    const getdata = async () => {
        const user_id = await AsyncStorage.getItem('user_id')
        const requestOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                //   Authorization: token,
            },
        };

        fetch(`http://100.26.11.43/bnb/ownerroomAPI/`+user_id, requestOptions)
            .then(res => res.json())
            .then(resData => {
                setdata(resData);
            })
            .catch(error => console.log(error));
    };

    const functionDelete = (val) => {
        Alert.alert(
            "Delete",
            "Are you sure, you want to delete?",
            [
               
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              }, {
                text: "Ok",
                onPress: () => {
                    const requestOptions = {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json',
                            //   Authorization: token,
                        },
                    };
                    fetch(`http://100.26.11.43/bnb/roomAPI/`+val, requestOptions)
                    .then(res => res ? getdata() : null)
                },
                style: "ok",
              }
            ]
          );
    }



    return (




        <View style={styles.container}>

            <View style={{ backgroundColor: "black", position: 'absolute', top: 0, left: 0, width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} >
                    <MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="arrow-left" />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, color: "#fff" }}> My Rooms</Text>

                <TouchableOpacity onPress={() => { navigation.navigate('BookCount', { hotelid: id }) }} >
                    <MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="plus" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('UpdateBookCount', { room_id: item.id }) }}>
                        <View style={styles.image}>
                            <Image
                            resizeMode='contain'
                                source={{ uri: item.image }}
                                style={{  width: "100%", height:"100%" }}
                            >
                            </Image>
                        </View>
                        <View style={{ width:"60%", paddingHorizontal:"5%"}}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text style={styles.itemprice}>${item.price}</Text>
                            <Text style={styles.itemTitle}>Available : {item.available ? "Yes" : "No"}</Text>
                            <TouchableOpacity onPress={() => functionDelete(item.id)} style={{ padding:3, backgroundColor:"red", width:80, justifyContent:"center", alignItems:"center", borderRadius:5, marginTop:5}}>
                            <Text style={{...styles.itemprice, color:"white"}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}></FlatList>

            {/*  */}

        </View>


    );
};

export default ViewHistory;


const styles = {
    container: {
        // flex: 1,
        backgroundColor: '#f0f0f0',
        // alignItems: 'center',
        paddingTop: '20%',
        height: '100%'
    },

    item: {
        backgroundColor: '#fff',
        marginHorizontal:"5%",
        color: '#fff',
        marginBottom: 10,
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 0.5,
        flexDirection: 'row',
        width:"90%",
        height:150

    },

    image: {
        width: "40%",
        height:"100%",
        backgroundColor: '#a5a5a5',
    },
    itemText: {
        fontSize: 20,
        fontWeight: '700',
        // width: '90%',
        color: '#17baa1',
        marginTop: 15
    },

    itemTitle: {
        fontSize: 16,
        fontWeight: '400',
        // width: '90%',
        color: 'green',
        maxHeight: '35%'
    },

    itemprice: {
        fontSize: 12,
        fontWeight: '400',
        // width: '90%',
        color: 'orange',
    },




};