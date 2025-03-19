import React, { Component } from "react";
import { StatusBar, ActivityIndicator, BackHandler, StyleSheet, View,Switch, Button, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import Toast from 'react-native-simple-toast';
import { WebView } from 'react-native-webview';
// import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/Ionicons';


const Payment = (props) => {

    // state variables
    const [useLiteCreditCardInput, setUseLiteCreditCardInput] = React.useState(false)
    const [form, setForm] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState({})
    // const [orderId,setorderId] = React.useState()
    // const [Type,setType] = React.useState()
    const [URL,setURL] = React.useState()

    // useEffect
    React.useEffect(() => {
        orderDetailHandler();
        BackHandler.addEventListener('hardwareBackPress', () => handleBackButtonClick());
    }, [])

    // functions
    const handleBackButtonClick = () => {
        props.navigation.navigate("index");
        return true;
    }

    orderDetailHandler = async () => {
        const {  order_id, type} = props.route.params
        // alert(order_id)
        // setType(type)
        // setorderId(order_id)
        if (type === 'Shop')
        {
            const url = `http://100.26.11.43/billing/card-form/?order_id=${order_id}`
            setURL(url)
            // alert('S')
        }
        else{
            const url = `http://100.26.11.43/bnb/card-form/?order_id=${order_id}` 
            setURL(url)
            // alert(url)
            // alert('H')
    
        }
        // if (Type == 'Shop'){
        // let token = await AsyncStorage.getItem('token')
        // let res = await axios.get(url, {
        //     headers: { Authorization: token }
        // })
        // setData(res.data)
        // setorderId(res.data.order_id)
        // setLoading(false)
    }
        
    


    // component rendering
    // const { order_id } = props.route.params
    // alert(order_id)
    // alert(data.order_id)



    
    if (loading) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container1}>
                    <Icon style={{ color: "#fff", padding: 12 }}
                        size={30} name="arrow-back-outline"
                        onPress={() => props.navigation.navigate("index")} />

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
    else {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container1}>
                    <Icon style={{ color: "#fff", padding: 12 }}
                        size={30} name="arrow-back-outline"
                        onPress={() => props.navigation.goBack()} />

                </View>
                <View style={s.container}>
                    <Text style={{ color: "purple", fontSize: 20, alignSelf: "center", }}>
                        This process may take some time
                    </Text>
                    { <WebView source={{ uri: URL}} style={{ marginTop: 20 }} /> } 
                </View>
            </View>
        );
    }
};

const s = StyleSheet.create({
    switch: {
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    container: {
        backgroundColor: "#F5F5F5",

        flex: 1
    },
    label: {
        color: "black",
        fontSize: 12,
    },
    input: {
        fontSize: 16,
        color: "black",
    },
});

const styles = {
    container1: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "black"
    },
    activityStyle: {
        padding: 30,
        // borderWidth:1,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        borderColor: "#17baa1"

    },
    activitycontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
}


export default Payment;
