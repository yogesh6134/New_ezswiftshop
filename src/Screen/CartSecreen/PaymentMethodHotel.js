import React from 'react';
import { View, Text, Button, TextInput, BackHandler, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';
// import { TextField } from 'react-native-material-textfield';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import * as Animatable from 'react-native-animatable';
// import { RadioButton } from 'react-native-paper';

const PaymentMethodHotel = (props) => {

    // state variables
    const [method, setMethod] = React.useState("wallet money")
    const [data, setData] = React.useState({})

    // useEffect
    React.useEffect(() => {
        WalletFetchHandler()
        BackHandler.addEventListener('hardwareBackPress', () => handleBackButtonClick());
        BackHandler.removeEventListener('hardwareBackPress', () => handleBackButtonClick());
    })

    // functions
    const WalletFetchHandler = async () => {
        let token = await AsyncStorage.getItem('token')
        
        let res = await axios.get("http://100.26.11.43/ewallet/detail/", {
            headers: {
                "Authorization": token
            }
        })
        setData(res.data)
    }

    const payHandler = async () => {

        const { order_id } = props.route.params
        if (method === 'wallet money') {
            let res = await axios.get("http://100.26.11.43/bnb/payment/?order_id=" + order_id)
            console.log(res)
            if (res.data.status == 200) {
                AsyncStorage.removeItem('appointment_id')
                props.navigation.navigate('thankYou')
                // alert(JSON.stringify(res))
            } else {
                props.navigation.navigate('failed')
            }

        } else {
            const { url } = props.route.params
            props.navigation.navigate('payment', { order_id : order_id, type: 'Hotel'})

        }
    }


    // const payHandlerhotel = async () => {
    //     const { order_id } = props.route.params
    //     alert(order_id)
    //     if (method === 'wallet money') {
    //         let res = await axios.get("http://100.26.11.43/bnb/payment/?order_id=" + order_id)
    //         if (res.data.status == 200) {
    //             AsyncStorage.removeItem('appointment_id')
    //             props.navigation.navigate('thankYou')
    //             // alert(JSON.stringify(res))
    //         } else {
    //             props.navigation.navigate('failed')
    //         }

    //     } else {
    //         const { url } = props.route.params
    //         props.navigation.navigate('payment', { url: url })

    //     }
    // }

    const handleBackButtonClick = () => {
        props.navigation.navigate("index");
        return true;
    }




    // component rendering
    if (false) {
        return (
            <View style={{ flex: 1 }}>
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
                {/* <View style={{ flexDirection: "row", height: 50, padding: 10, justifyContent: "flex-start", backgroundColor: "black" }}>
                    <MaterialCommunityIcons
                        onPress={() => props.navigation.navigate("HomeScreen")}
                        name="arrow-left" color="#fff" size={25} />
                </View> */}
                <View style={styles.mainContainer}>
                    <View>
                        <TouchableOpacity onPress={() => setMethod('wallet money')}
                            style={{ alignItems: "center", flexDirection: "row", marginLeft: 10 }}>
                            {/* <RadioButton
                                value="wallet money"
                                status={method === 'wallet money' ? 'checked' : 'unchecked'}
                                onPress={() => setMethod('wallet money')}
                            /> */}
                            <Text style={{ color: "orange" }}>wallet money</Text>
                            <Text style={{ color: "#17baa1", fontSize: 20, marginLeft: 30 }}>$ {data.money}</Text>

                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => setMethod('debit/credit card')}
                        style={{ alignItems: "center", flexDirection: "row", marginLeft: 10 }}>
                        {/* <RadioButton
                            value="debit/credit card"
                            status={method === 'debit/credit card' ? 'checked' : 'unchecked'}
                            onPress={() => setMethod('debit/credit card')}
                        /> */}
                        <Text style={{ color: "orange" }}>debit/credit card</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => payHandler()}
                    style={{ margin: 5, height: 40, backgroundColor: "black", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 25, color: "#ffffff" }}>PAY</Text>
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = {
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
    mainContainer: {
        padding: 10,
        margin: 10,
        marginTop: 30,
        // alignItems: 'center',
        justifyContent: 'center',
        // alignItems:"center"
        backgroundColor: "#e0ffff",
    },
    container: {
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 3,
        borderColor: "rgb(204, 204, 204)",
        backgroundColor: "rgb(245, 245, 245)",
        padding: 15

    },


}

export default PaymentMethodHotel;
