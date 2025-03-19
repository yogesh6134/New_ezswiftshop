import React, { useState } from 'react';
import { Button, Dimensions, Image, View, Text, TouchableOpacity, AsyncStorage, ScrollView, TextInput, ActivityIndicator, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { TextField } from 'react-native-material-textfield';
// import navigation from '../navigation';
// import BookCount from './BookCount';
const Alllist = ({navigation}) => {
    return (



        <View style={styles.main}>
            <View style={{ backgroundColor: "black" , position: 'absolute',top: 0, left: 0,width: '100%',flexDirection: 'row', alignItems:"center"}}>
                <TouchableOpacity onPress={() => {navigation.navigate('home')}} >
                    <MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="arrow-left" />
                </TouchableOpacity>
                <Text style={{fontSize:25,color:"#fff"}}> BNB</Text>
            </View>


            <View style={styles.midContainer}>
                {/* Tile */}
                <TouchableOpacity style={styles.tile} onPress={() => {navigation.navigate('BookCount')}}>

                    {/* Header */}
                    <View style={styles.tileHeader}>
                        <Text style={[styles.tileHeaderText]}>Add Room</Text>
                    </View>



                </TouchableOpacity>


                <TouchableOpacity style={styles.tile} onPress={() => {navigation.navigate('ViewHistory')}}>

                    {/* Header */}
                    <View style={styles.tileHeader}>
                        <Text style={[styles.tileHeaderText]}>My Rooms</Text>
                    </View>



                </TouchableOpacity>


                <TouchableOpacity style={styles.tile} onPress={() => {navigation.navigate('Booking')}}>

                    <View style={styles.tileHeader}>
                        <Text style={[styles.tileHeaderText]}>Bookings</Text>
                    </View>



                </TouchableOpacity>


                {/* <TouchableOpacity style={styles.tile} onPress={() => {navigation.navigate('')}}>

                    <View style={styles.tileHeader}>
                        <Text style={[styles.tileHeaderText]}>Profile</Text>
                    </View>



                </TouchableOpacity> */}


                



            </View>
        </View>
    )
}

export default Alllist




// import {
//     styles,
//     Dimensions,
// } from 'react-native'

const { height, width } = Dimensions.get('window');
const styles = {


    main: {
        flex: 1,
        // height: '10%',
        paddingTop: '20%',
        width: '100%',
        // backgroundColor : '	#890000', // Maroon (dark red)
        // backgroundColor: '	#F0F0F0', // light grey
        backgroundColor: '#fff', // Red 
        // backgroundColor: '#fff',
        // justifyContent: 'center',
        alignItems: 'center',

    },

    text: {
        color: 'black',
        letterSpacing: 1.15,
    },

    header: {
        // padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: '12%'
    },

    headerText: {
        color: '#B22222',
        color: 'black',
        // fontWeight: 'bold',
        fontSize: 20,
        // // fontFamily: 'AdobeClean-ExtraBold',
        paddingLeft: 10,
        paddingRight: 10,
        // paddingBottom: 10,
    },

    // logo: {
    //     width: 200, 
    //     resizeMode:'contain', 
    //     height:200,npm i react-native-check-box
    // },

    midcontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        // borderColor: "rgb(204, 204, 204)",
        // backgroundColor: "rgb(245, 245, 245)",
        alignItems: 'center',
        padding: 30,
    },

    tile: {
        // // fontFamily: 'AdobeClean-Regular',
        // maxWidth: 150,
        width: (width - 50),
        // width: '100%',
        backgroundColor: '#17baa1',

        borderRadius: 10,
        paddingBottom: 10,
        marginBottom: 25,
        elevation: 3,
    },

    tileHeader: {
        paddingLeft: 30,
        paddingRight: 20,
        paddingTop: 10,
        // paddingBottom: 20, 
        // borderBottomWidth: 1.5,
        // borderColor: '#E8E8E8',
        maxWidth: '100%',
        borderRadius: 30,
        // marginBottom: 10,
    },

    tileHeaderText: {
        // fontFamily: 'AdobeClean-BoldCond',
        fontSize: 20,
        letterSpacing: 1.15,
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
        // color: '#B22222',
        color: 'black',
        // paddingBottom:15
    },

    tileMid: {
        paddingLeft: 30,
        paddingRight: 30,
    },

    fieldSet: {
        // fontFamily: 'AdobeClean-Light',
        // maxWidth: 500,
        width: '100%',
        height: 65,
        // marginBottom: 10,
    },

    buttonView: {
        alignSelf: 'flex-end',
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    tileFooter: {
        alignSelf: 'flex-end'
    },

    tileFooterText: {
        // fontFamily: 'AdobeClean-Bold',
        fontSize: 17,
        color: '#800000',
    },

    footer: {
        // marginTop: 10,
        // alignItems: 'center',
        // alignSelf: 'flex-end',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
    },

    footerText: {
        // color: 'black',
        // fontFamily: 'AdobeClean-Regular',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 0.1,
        marginBottom: 5,
        alignSelf: 'flex-end',
    },

    hypertext: {
        // color:'#0073CF', //light blue
        color: '#0F52BA',
        fontWeight: 'bold',
    },


};