import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, StatusBar, NativeEventEmitter,NativeModules } from 'react-native';
// import { ListItem, Footer, FooterTab, Button } from 'native-base';
import axios from 'axios';
import ListCartItem from './ListCartItems';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Tts from 'react-native-tts';
// import * as Speech from 'expo-speech'
let image = require('../assets/FAVPNG_shopping-bags-trolleys-paper-bag_AKThabaV.png')


const Cart = (props) => {

    // state variables
    const [data, setData] = React.useState({})
    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const isFocused = useIsFocused();



	const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
	ee.addListener('tts-start', () => {});
	ee.addListener('tts-finish', () => {});
	ee.addListener('tts-cancel', () => {});

    // usestate
    React.useEffect(() => {
        console.log(props)
        cartAPIhandler()
        console.log("first call", data)
    }, [isFocused])

    // functions
    const refreshAPIhandler = () => {
        cartAPIhandler()
    }

    const cartAPIhandler = async () => {
        setLoading(true)
        let token = await AsyncStorage.getItem('token')
        let res = await axios.get("http://100.26.11.43/cart/", {
            headers: { Authorization: token }
        })
        console.log("api called--", res.data)
        // set new retrieved values
        setData(res.data)
        if (res.data.products.length == 0) {
            setProducts([])
        } else {
            setProducts(res.data.products)
        }
        setLoading(false)
        let speech = String(res.data.cart_total)
        Tts.speak("Your Cart total is " + speech)
    }

    const cartNavigationCheckHandler = async () => {
        setLoading(true)
        if (data.total_items === 0) {
            setLoading(false)
            alert("No Item in Cart")
        } else {
            props.navigation.navigate('shipping')
        }
    }

    const renderProductHandler = (products) => {
        return products.map((t, key) => {
            return (
                <ListCartItem
                    fun={refreshAPIhandler}
                    data={t}
                    key={key}
                    navigation={props.navigation}
                />
            )
        })
    }


    // component rendering
    if (loading) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.textStyle}>
                    <TouchableOpacity  >
                        <Icon size={40} name="ios-close" color='#eee' onPress={() => props.navigation.goBack(null)} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 10, color: "#eee", fontSize: 15, fontWeight: 'bold' }}>MY BAG</Text>
                </View>
                <View style={styles.activitycontainer}>
                    <View style={styles.activityStyle}>
                        <ActivityIndicator size="large" color="#17baa1" />
                        <StatusBar barStyle="default" />
                    </View>
                </View>
            </View>
        )
    }
    else if (products.length >> 0) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.textStyle}>
                    <Icon size={50} name="ios-close" color='#eee'
                        style={{ marginLeft: 10 }}
                        onPress={() => { props.navigation.goBack(null) }} />
                    <Text style={{ marginLeft: 10, color: "#eee", fontSize: 15, fontWeight: 'bold' }}>MY BAG</Text>
                </View>
                <ScrollView>

                    <Text style={{ margin: 5, fontWeight: "bold",  color: "#000" }}>ITEMS({data.total_items})</Text>
                    <View>
                        {renderProductHandler(products)}
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.SummaryStyle}> Order Summary</Text>
                        <View>
                            <Text style={{ color: '#000' }} >Total Items : {data.total_items}</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#000' }}>Cart Total :${data.cart_total}</Text>
                        </View>
                    </View>


                    {/* <Footer style={styles.footerStyle1}>
                    </Footer> */}
                </ScrollView>
                    <TouchableOpacity onPress={() => cartNavigationCheckHandler()}>
                        <View style={styles.footerStyle2}>
                            <Text style={styles.footer2TextStyle}>
                                CHECKOUT
                            </Text>
                        </View>
                    </TouchableOpacity>
            </View>

        )
    } else {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.textStyle}>
                    <Icon size={50} name="ios-close" color='#eee'
                        style={{ marginLeft: 10 }}
                        onPress={() => { props.navigation.goBack(null) }} />
                    <Text style={{ marginLeft: 10, color: "#eee", fontSize: 15, fontWeight: 'bold' }}>MY BAG</Text>
                </View>

                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                    <Image style={{ height: 200, width: 200 }} source={image} />

                    <Text style={{ fontSize: 25, color: "#17baa1" }}>Nothing in the bag</Text>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('App', { screen: 'Shops' }) }}>
                        <Text style={{ fontSize: 15, color: "orange" }}>CONTINUE SHOPPING</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
};


const styles = StyleSheet.create({
    activityStyle: {
        padding: 30,
        // borderWidth:1,
        borderRadius: 5,
        backgroundColor: "#fff",
        borderColor: "#17baa1"

    },
    activitycontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        alignItems: 'center',

        // justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "black",
        padding: 10

    },
    SummaryStyle: {
        alignItems: "center",
        color: "grey"
    },
    footerStyle1: {

        backgroundColor: "#eee"

    },
    footerStyle2: {

        backgroundColor: "#17baa1",
        alignItems:"center"
    },
    footer2TextStyle: {
        alignItems: 'center',
        padding: 10,
        fontSize: 23,
        color: "#fff"
    }

})

export default Cart
