import React, { useState ,useEffect} from 'react';
import { Button, Dimensions, Image, FlatList, View, Text, TouchableOpacity, AsyncStorage, ScrollView, TextInput, ActivityIndicator, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
const AllHotels = ({ navigation }) => {

    

    const [data,setdata] = useState();

        useEffect(() => {
            getdata();
            // //alert(JSON.stringify(data))
            return () => { };
        }, []);




        const getdata = () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    //   Authorization: token,
                },
            };

            fetch('http://100.26.11.43/bnb/hotel/', requestOptions)
                .then(res => res.json())
                .then(resData => {
                    // console.log(JSON.stringify(resData))
                    setdata(resData);
                    // //alert(JSON.stringify(resData))
                    // //alert(JSON.stringify(resData))
                    // setHotelName(resData[0].hotel_name)


                })
                .catch(error =>console.log(error));
        };
    


        return (

            <View style={styles.container}>
                <View style={{ backgroundColor: "black", position: 'absolute', top: 0, left: 0, width: '100%', flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} >
                        <MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="arrow-left" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 25, color: "#fff" }}> All Hotels</Text>
                </View>


                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (


                        <View>
                            <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('AllHotelDetails', {id:item.id}) }}>



                                <View style={styles.image}  >
                                    <Image
                                        source={{ uri: item.hotel_image }}
                                        style={{ height: 70, width: 70 }}
                                    >
                                    </Image>
                                </View>
                                <View style={styles.fieldset}>
                                    <Text style={styles.itemText}
                                        > {item.hotel_name}</Text>
                                </View>

                            </TouchableOpacity>









                        </View>
                    )}>

                </FlatList>
            </View >

        )
    }

    export default AllHotels


    const { height, width } = Dimensions.get('window');
    const styles = {


        container: {
            flex: 1,
            backgroundColor: '#f0f0f0',
            alignItems: 'center',
            paddingTop: '20%',
        },

        headerText: {
            color: 'black',
            fontFamily: 'AdobeClean-Bold',
            margin: 10,
        },

        // midContainer: {
        //     fontFamily: 'AdobeClean-Regular',
        //     justifyContent: 'center',
        //     width: '95%',
        //     backgroundColor: '#FFF',
        //     borderRadius: 15,
        //     paddingBottom: 20,
        //     marginBottom: 10,
        //     height: '90%',
        //     elevation: 3,
        //     marginTop: 10,
        // },








        item: {
            backgroundColor: '#fff',
            padding: 15,
            height: 100,
            color: '#fff',
            marginBottom: 1,
            width: (width - 30),
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
            borderRadius: 12,
            // borderColor: '#787878',
            // borderWidth: 0.5,
            elevation: 3


        },

        image: {
            width: 70,
            height: 70,
            backgroundColor: '#55BCF6',
            // opacity: 0.4,
            // borderRadius: 30,
            // marginRight: 15,
        },

        fieldset: {
            flexDirection: 'row',
            maxWidth: '80%',
            // maxHeight: 5,
            // flexWrap: 'wrap',
            // alignItems: 'center',

        },

        itemText: {
            fontSize: 30,
            fontWeight: '400',
            width: '90%',
            color: 'orange',
            // alignself: 'center',
            // marginTop: 25
            // flexWrap:
            // flexDirection: 'row'
        },

        itemTitle: {
            fontSize: 20,
            fontWeight: '400',
            width: '90%',
            color: 'green',
            // flexWrap:
            // flexDirection: 'row'
        },

        itemlocation: {
            fontSize: 20,
            fontWeight: '400',
            width: '90%',
            color: 'black',
            // flexWrap:
            // flexDirection: 'row'
        },

        itemprice: {
            fontSize: 20,
            fontWeight: '400',
            width: '90%',
            color: 'orange',
            // flexWrap:
            // flexDirection: 'row'
        },
    }