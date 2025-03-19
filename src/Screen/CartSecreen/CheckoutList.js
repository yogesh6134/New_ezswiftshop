import React from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const CheckoutList = (props) => {

    // state variables
    const [data, setData] = React.useState(props.data)
    const [contents, setContents] = React.useState(props.data.content)
    const [token, setToken] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    // useEffect
    React.useEffect(() => {
        console.log('cheking checkout image',data.product.product_image)
        getTokenhandler()
    }, [])


    // functions
    const getTokenhandler = async () => {
        let token = await AsyncStorage.getItem('token')
        setToken(token)
    }

    deleteItemHandler = async (data) => {
        setLoading(true)
        await axios.get(props.data.delete_item_from_cart,
            {
                headers: { Authorization: token }
            })
        await axios.get("http://100.26.11.43/cart",
            {
                headers: { Authorization: token }
            })
        await axios.get("http://100.26.11.43/cart/checkout",
            {
                headers: { Authorization: token }
            })
        props.fun()
        setLoading(false)
    }

    const quantityIncreaseHandler = async () => {
        setLoading(true)
        await axios.get("http://100.26.11.43/cart/order_item/quantity_increase/" + props.data.item_id, {
            headers: { Authorization: token }
        })
        await axios.get("http://100.26.11.43/cart",
            {
                headers: { Authorization: token }
            })
        await axios.get("http://100.26.11.43/cart/checkout",
            {
                headers: { Authorization: token }
            })
        props.fun()
        setLoading(false)
    }

    const quantitydecreaseHandler = async () => {
        if (data.quantity > 1) {
            setLoading(true)
            await axios.get("http://100.26.11.43/cart/order_item/quantity_decrease/" + props.data.item_id, {
                headers: { Authorization: token }
            })
            await axios.get("http://100.26.11.43/cart",
                {
                    headers: { Authorization: token }
                })
            await axios.get("http://100.26.11.43/cart/checkout",
                {
                    headers: { Authorization: token }
                })
            props.fun()
            setLoading(false)
        } else {

        }
    }

    const productContentMapHandler = () => {
        return contents.map((t, key) => {
            return (
                <View key={key} style={{ elevation: 3, backgroundColor: "#fff", height: 25, margin: 5, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, color: "orange" }}>{t.content}</Text>
                </View>
            )
        })

    }

    // component rendering
    // let data = props.data
    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.activityStyle}>
                    <ActivityIndicator size="large" color="#17baa1" />
                    <StatusBar barStyle="default" />
                </View>
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View>
                            <Image style={styles.imgStyle}
                                source={{ uri: data.product.product_image }} />
                                
                        </View>
                        <View style={{ margin: 5, flex: 1 }} >
                            <Text style={{ marginLeft: 25, color: "#17baa1", fontSize: 20 }}>{data.product_name}</Text>
                            <Text style={{ marginLeft: 25, color: "orange", fontSize: 25, fontWeight: "bold" }}>${data.price}</Text>
                        </View>
                    </View>
                </View>
                {/* <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 10 }}>
                    <View style={{ backgroundColor: "#fff", flexDirection: "row", borderColor: "grey", borderRadius: 5, borderWidth: 1, alignItems: "center", elevation: 2, height: 35, }}>
                        <View>
                            <MaterialCommunityIcons style={{}}
                                name="minus" size={33} onPress={() => quantitydecreaseHandler()} color="orange" />
                        </View>
                        <View style={{ backgroundColor: "#17baa1", width: 50, elevation: 3 }}>
                            <Text style={{ color: "#fff", alignSelf: "center", fontSize: 27 }}>{data.quantity}</Text>
                        </View>
                        <View>
                            <MaterialCommunityIcons name="plus" size={30} onPress={() => quantityIncreaseHandler()} color="orange" />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => deleteItemHandler()}
                        style={{ backgroundColor: "orange", flexDirection: "row", borderColor: "grey", borderRadius: 5, borderWidth: 1, justifyContent: "center", alignItems: "center", elevation: 2, height: 35, width: 150 }}>
                        <Icon onPress={() => deleteItemHandler()}
                            size={30} name="ios-trash" color="#fff" />
                        <Text style={{ padding: 4, fontSize: 20, color: "#fff" }}>
                            Remove
                        </Text>
                    </TouchableOpacity>
                </View> */}
                <View style={{ elevation: 2 }}>
                    <View style={{ alignItems: "center" }}>
                        {(contents.length >> 0) ? <Text style={{ color: "#17baa1", fontSize: 17 }}>Product Contents</Text> : null}
                    </View>
                    {productContentMapHandler()}
                </View>
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
    container: {
        backgroundColor: '#e0ffff',
        margin: 7,
        elevation: 3,



    },
    imgStyle: {
        height: 100,
        width: 100,
        borderWidth: 2,
        borderColor: "#eee"

    }
}


export default CheckoutList;
