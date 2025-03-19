import React from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StatusBar, ScrollView } from 'react-native';
// import { ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
// import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartDetail = (props) => {

    // state variables
    // const [data, setData] = React.useState({})
    const [contents, setContents] = React.useState([])
    const [token, setToken] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const { data } = props.route.params
    // useEffect
    React.useEffect(() => {
        getTokenhandler()
        // setData(data)
        setContents(data.content)
    });

    // functions
    const getTokenhandler = async () => {
        let token = await AsyncStorage.getItem('token')
        // this.setState({ token: token })
        setToken(token)
    };

    const productContentMapHandler = () => {
        return contents.map((t, key) => {
            return (
                <View key={key} style={{ padding: 10, flexDirection: "row", elevation: 3, backgroundColor: "#fff", height: 25, margin: 5, alignItems: "center", justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ fontSize: 15, color: "orange" }}>{t.content}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 15, color: "orange" }}>${t.content_price}</Text>
                    </View>
                </View>
            )
        })
    };



    // component render
    // const { data } = props.route.params
    if (loading) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container1}>
                    <Icon style={{ color: "#fff", padding: 12 }}
                        size={30} name="arrow-back-outline"
                        onPress={() => { props.navigation.goBack() }} />

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
                        onPress={() => { props.navigation.goBack() }} />

                </View>
                <ScrollView onPress={() => { props.navigation.navigate('cartDetail') }}
                    style={styles.container}>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View>
                                <Image style={styles.imgStyle}
                                    source={{ uri: data.product.product_image }} />
                            </View>
                            <View style={{ margin: 5, flex: 1 }} >
                                <Text style={{ marginLeft: 25, color: "#17baa1", fontSize: 20 }}>{data.product.product_name}</Text>
                                <Text style={{ marginLeft: 25, color: "orange", fontSize: 25, fontWeight: "bold" }}>${data.product.product_price}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ elevation: 2 }}>
                        <View style={{ alignItems: "center" }}>
                            {(contents.length >> 0) ? <Text style={{ color: "#17baa1", fontSize: 17 }}>Product Contents</Text> : null}
                        </View>
                        {productContentMapHandler()}
                    </View>
                    <View style={{ backgroundColor: "#fff", padding: 10 }}>
                        <View style={{ padding: 10, flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <View>
                                <Text>Subtotal :</Text>
                            </View>
                            <View>
                                <Text> $ {data.Product_price}</Text>
                            </View>
                        </View>
                        <View style={{ padding: 10, flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <View>
                                <Text>Tax :</Text>
                            </View>
                            <View>
                                <Text> $ {data.Tax}</Text>
                            </View>
                        </View>
                        <View style={{ padding: 10, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <View>
                                <Text style={{ fontWeight: "bold" }}>Total :</Text>
                            </View>
                            <View>
                                <Text style={{ fontWeight: "bold" }}> $ {data.price}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
        elevation: 3,


    },
    imgStyle: {
        height: 150,
        width: 150,
        borderWidth: 2,
        borderColor: "#eee"

    },
    container1: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "black"
    },

}



export default CartDetail;
