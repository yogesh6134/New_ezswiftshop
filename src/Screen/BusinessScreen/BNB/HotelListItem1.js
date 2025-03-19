import React, { useState, useEffect } from 'react';
import { Button, Image, Dimensions, FlatList, View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Picker} from '@react-native-picker/picker';


const { height, width } = Dimensions.get('window');

const HotelListItem = (props) => {

    



    return (




        <View style={{backgroundColor: '#f0f0f0',}}>

                    <View>

                        <TouchableOpacity style={styles.item} >



                            <View style={styles.image}>
                                <Image
                                    source={{ uri: props.data.image }}
                                    style={{ height: 200, width: 300 }}
                                >
                                </Image>
                            </View>
                            <View style={styles.fieldset}>
                                <Text style={styles.itemText}>{props.data.hotel_name}</Text>
                                <Text style={styles.itemprice}>${props.data.price}</Text>
                                <Text style={styles.itemTitle}>{props.data.title}</Text>
                            </View>

                        </TouchableOpacity>



                    </View>
                

        </View>

        // </View>
    );
};

export default HotelListItem;


const styles = {
    // container: {
    //     flex: 1,
    //     backgroundColor: '#f0f0f0',
    //     alignSelf: 'flex-end',
    //     height: '100%'
        
    // },

    item: {
        backgroundColor: '#fff',
        padding: 25,
        height: 400,
        color: '#fff',
        marginBottom: 35,
        borderRadius: 20,
        borderColor: 'grey',
        borderWidth: 0.5,
        elevation: 5,
        flexWrap: 'wrap',
        flexDirection: 'row',

        

    },

    image: {
        width: 300,
        height: 200,
        backgroundColor: '#55BCF6',
    },

    

    itemText: {
        fontSize: 35,
        fontWeight: '400',
        // width: '90%',
        color: '#17baa1',
        marginTop: 25
    },

    itemTitle: {
        fontSize: 20,
        fontWeight: '400',
        // width: '90%',
        color: 'green',
        maxHeight: '20%'
    },

    itemprice: {
        fontSize: 20,
        fontWeight: '400',
        // width: '90%',
        color: 'orange',
    },




};



