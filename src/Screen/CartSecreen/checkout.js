import React from 'react';
import { View, Text, StyleSheet, TextInput, BackHandler, ScrollView, Platform, TouchableOpacity, ActivityIndicator, StatusBar, NativeEventEmitter, NativeModules } from 'react-native';
import axios from 'axios';
import CheckoutList from './CheckoutList';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Speech from 'expo-speech';
// import { RadioButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
// import Toast from 'react-native-simple-toast';
import Tts from 'react-native-tts';


const Checkout = (props) => {

    // state variables
    const [data, setData] = React.useState({})
    const [cart, setCart] = React.useState({})
    const [shop, setShop] = React.useState({})
    const [date, setDate] = React.useState(new Date())
    const [products, setProducts] = React.useState([])
    const [priceRangedata, setPriceRangeData] = React.useState([])
    const [token, setToken] = React.useState("")
    const [delivery_status, setDeliveryStatus] = React.useState("HOME DELIVERY")
    const [delivery_schedule, setDeliverySchedule] = React.useState("No Schedule")
    const [scheduleDate, setScheduleDate] = React.useState("")
    const [scheduleTime, setScheduleTime] = React.useState("")
    const [mode, setMode] = React.useState("date")
    const [show, setShow] = React.useState(false)
    const [Instructions, setInstructions] = React.useState("")
    const [deliveryDate, setDeliveryDate] = React.useState("")
    const [total, setTotal] = React.useState("")
    const [calculateDeliverychargesb, setCalculateDeliverychargesb] = React.useState(0)
    const [calculateddistance, setCalculatedDistance] = React.useState(0)
    const [appointment_id, setAppointmentId] = React.useState(0)
    const [loading, setLoading] = React.useState(false)

    const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
	ee.addListener('tts-start', () => {});
	ee.addListener('tts-finish', () => {});
	ee.addListener('tts-cancel', () => {});

    // useEffect
    React.useEffect(() => {
        // setLoading(true)
        cartAPIhandler()
        console.log(props.route)
        const { distance } = props.route.params;
        setCalculatedDistance(distance)
        async () => {
            // BackHandler.addEventListener('hardwareBackPress', () => { handleBackButtonClick() });
            // BackHandler.removeEventListener('hardwareBackPress', () => { handleBackButtonClick() });
            const appointment_id = await AsyncStorage.getItem('appointment_id');
            console.log(appointment_id, "hiii")
        }
        setAppointmentId(appointment_id == null ? 0 : appointment_id)
        setLoading(false)
    }, [])


    // functions
    const handleBackButtonClick = () => {
        props.navigation.navigate("index");
        return true;
    }

    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        setDate(currentDate)
        // console.log("current date", selectedDate)
        setDeliverySchedule(`Date ${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()} Time ${currentDate.getHours()}:${currentDate.getMinutes()}`)
        setScheduleDate(` ${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`)
        setScheduleTime(`${currentDate.getHours()}:${currentDate.getMinutes()}`)
        console.log(delivery_schedule);
    };

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    };

    const showDatepicker = () => {
        setShow(true)
        setMode('date')
        console.log(mode)
    };

    const showTimepicker = () => {
        setShow(true)
        setMode('time')
        console.log(mode)
    };

    const calculateDeliverycharges = () => {
        //   const {distance} = route.params;
        console.log('calcualte delivery')
        console.log(calculateddistance)
        console.log("range", priceRangedata)
        priceRangedata.map((item, index) => {
            if (calculateddistance >= item.start && calculateddistance <= item.end) {
                setCalculateDeliverychargesb(item.price);
                console.log("ee", calculateDeliverychargesb)
            }
        })

    }

    const getPriceRangeHandler = async () => {
        await axios.get(`http://100.26.11.43/shops/pricerange/${cart.product[0].product.shop_name.id}`)
            .then(res => {
                setPriceRangeData(res.data)
                console.log(res.data)
                calculateDeliverycharges()
                console.log("range handler")
            })
            .catch(err => { console.log(err) })
        console.log(cart.product[0].product.shop_name.id);
    }

    const refreshAPIhandler = () => {
        cartAPIhandler()
    }

    const cartAPIhandler = async () => {
        setLoading(true)
        let token = await AsyncStorage.getItem('token')
        setToken(token)
        let res = await axios.get("http://100.26.11.43/cart/checkout", {
            headers: { Authorization: token }
        })
        // setState({ data: res.data, products: res.data.cart.product })
        console.log("res.data => ", res.data)
        console.log("res.data.cart => ", res.data.cart)
        console.log("res.data.shop => ", res.data.shop)
        setData(res.data)
        // alert(JSON.stringify(res.data.order_id))
        setCart(res.data.cart)
        setShop(res.data.shop)
        setProducts(res.data.cart.product)
        // setState({ loading: false })
        getPriceRangeHandler()
        // console.log(data.cart.product[0].product.shop_name.id)

        let speech = String(res.data.total)
        Tts.speak("Your total is " + speech)
        let total = parseFloat(res.data.cart.total_price) + parseFloat(res.data.service_charge)
        setTotal(total)
        setLoading(false)
    }

    const cartNavigationCheckHandler = async () => {
        console.log(appointment_id)
        setLoading(true)
        if (cart.total_items === 0) {
            setLoading(false)
            alert("No Item in Cart")

        } else if (delivery_status == 'PHYSICAL SHOPPING' && cart.total_items > shop.personal_pickup_limit) {
            // Toast.show("PHYSICAL SHOPPING LIMIT IS " + shop.personal_pickup_limit)
            setLoading(false)

        } else {
            console.log('calc', calculateDeliverychargesb, appointment_id)
            await axios.get("http://100.26.11.43/orders/place/?status=" + delivery_status +
                "&delivery_schedule=" + delivery_schedule +
                "&instructions=" + Instructions + "&appointment_id=" + appointment_id + "&calculateddeliverycharges=" + (calculateDeliverychargesb).toString(),
                {
                    headers: { Authorization: token }
                })
            props.navigation.navigate('PaymentMethod', { url: data.order_detail, order_id: data.order_id })
        }
    }

    const renderProductHandler = () => {
        return products.map((t, key) => {
            return (<CheckoutList fun={refreshAPIhandler} data={t} key={key} />)
        })
    }


    // component rendering
    // return (
    //     <View style={{ flex: 1 }}>
    //         <Text>render complete</Text>
    //         <Text>{cart.total_items}</Text>
    //         {/* <Text>{data.shop}</Text> */}
    //     </View>
    // )
    if (loading) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.textStyle}>
                    <Icon size={30} name="close" color='#eee' onPress={() => { props.navigation.navigate("index") }} />
                    <Text style={{ marginLeft: 10, color: "#eee", fontSize: 15, fontWeight: 'bold' }}>Order</Text>
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

            <View style={{ backgroundColor: "#eee", flex: 1 }}>
                <View style={styles.textStyle}>
                    <Icon size={30} name="close" color='#eee' onPress={() => { props.navigation.navigate("cart") }} />
                    <Text style={{ marginLeft: 10, color: "#eee", fontSize: 15, fontWeight: 'bold' }}>Order</Text>
                </View>
                <ScrollView>

                    <Text style={{ margin: 5, fontWeight: "bold",  color: "#000" }}>ITEMS({cart.total_items})</Text>
                    <View>
                        {renderProductHandler()}
                    </View>

                    <View style={{ elevation: 3, flex: 1, backgroundColor: "#fff", margin: 8, marginTop: 10 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 25, color: "#17baa1" }}>Delivery Type</Text>
                        </View>
                        {shop.home_delivery ?
                            <TouchableOpacity onPress={() => setDeliveryStatus('HOME DELIVERY')}
                                style={{ alignItems: "center", flexDirection: "row", marginLeft: 10 }}>
                                {/* <RadioButton
                                    value="HOME DELIVERY"
                                    status={delivery_status === 'HOME DELIVERY' ? 'checked' : 'unchecked'}
                                    onPress={() => setDeliveryStatus('HOME DELIVERY')}
                                /> */}
                                <Text style={{ color: "orange" }}>HOME DELIVERY</Text>
                            </TouchableOpacity> : null}
                        <TouchableOpacity onPress={() => setDeliveryStatus('PERSONAL PICKUP')}
                            style={{ alignItems: "center", flexDirection: "row", marginLeft: 10 }}>
                            {/* <RadioButton
                                value="PERSONAL PICKUP"
                                status={delivery_status === 'PERSONAL PICKUP' ? 'checked' : 'unchecked'}
                                onPress={() => setDeliveryStatus('PERSONAL PICKUP')}
                            /> */}
                            <Text style={{ color: "orange" }}>PERSONAL PICKUP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setDeliveryStatus('PHYSICAL SHOPPING')}
                            style={{ alignItems: "center", flexDirection: "row", marginLeft: 10 }}>
                            {/* <RadioButton
                                value="PHYSICAL SHOPPING"
                                status={delivery_status === 'PHYSICAL SHOPPING' ? 'checked' : 'unchecked'}
                                onPress={() => setDeliveryStatus('PHYSICAL SHOPPING')}
                            /> */}
                            <Text style={{ color: "orange" }}>PHYSICAL SHOPPING</Text>
                        </TouchableOpacity>

                    </View>


                    <View style={{ elevation: 3, flex: 1, backgroundColor: "#fff", margin: 8, marginTop: 10 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 25, color: "#17baa1" }}>Delivery Schedule</Text>
                        </View>
                        <View style={{ elevation: 3, alignItems: "center", justifyContent: 'center', margin: 5, flexDirection: "row", marginLeft: 10 }}>
                            <View style={styles.ScheduleStyle}>
                                <Text>{scheduleDate}</Text>
                            </View>
                            <MaterialCommunityIcons onPress={() => { showDatepicker() }}
                                name="calendar" color="#17baa1" size={25} />
                        </View>
                        <View style={{ elevation: 3, alignItems: "center", justifyContent: 'center', margin: 5, flexDirection: "row", marginLeft: 10 }}>
                            <View style={styles.ScheduleStyle}>
                                <Text>{scheduleTime}</Text>
                            </View>
                            <MaterialCommunityIcons onPress={() => { showTimepicker() }}
                                name="clock" color="#17baa1" size={25} />
                        </View>

                    </View>
                    <View style={{ elevation: 3, flex: 1, backgroundColor: "#fff", marginTop: 10 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 25, color: "#17baa1" }}>Special Instructions</Text>
                        </View>
                        <View style={{ backgroundColor: "#eee", height: 100, margin: 10, padding: 3, borderWidth: 1 }}>
                            <TextInput
                                style={{ fontSize: 16, color: "orange" }}
                                value={Instructions}
                                onChangeText={text => setInstructions(text)}
                                multiline={true} />
                        </View>

                    </View>


                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={styles.SummaryStyle}> Order Summary</Text>
                        <View>
                            <Text style={{ color: '#000' }}>Total Items : {cart.total_items}</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#000' }}>Products Total : ${cart.total_price}</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#000' }}>Service Charges : ${data.service_charge}</Text>
                        </View>
                        <View>
                            {(delivery_status == "HOME DELIVERY") ?
                                // <Text>Delivery Charges : ${data.shipping_total}</Text> 
                                <Text style={{ color: '#000' }}>Delivery Charges : ${calculateDeliverychargesb}</Text> :
                                <Text style={{ color: '#000' }}>Delivery Charges : $0.00</Text>
                            }
                        </View>
                        <View>
                            {(delivery_status == "HOME DELIVERY") ?
                                <Text style={{ color: '#000' }}>Order Total : ${data.total}</Text> :
                                <Text style={{ color: '#000' }}>Order Total : ${total}</Text>
                            }
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => cartNavigationCheckHandler()}
                    style={styles.footerStyle2}>
                    <Text style={styles.footer2TextStyle}>
                        Place Order
                    </Text>

                </TouchableOpacity>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        dateFormat="dayofweek day month"
                        onChange={onChange}
                    />)}
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
        padding: 10,
        fontFamily: "Cochin"

    },
    SummaryStyle: {
        alignItems: "center",
        color: "grey"
    },
    footerStyle1: {

        backgroundColor: "#eee",

    },
    footerStyle2: {

        backgroundColor: "#17baa1",
        justifyContent: "center",
        alignItems: "center"

    },
    footer2TextStyle: {
        alignItems: 'center',
        padding: 10,
        fontSize: 23,
        color: "#fff"
    },
    ScheduleStyle: {
        backgroundColor: "#eee",
        width: "70%",
        height: 30,
        justifyContent: "center",
        borderColor: "grey",
        borderWidth: 1,
        margin: 10,
        borderRadius: 2
    }

})


export default Checkout;
