import React from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const BillingAddress = (props) => {

    // state variables
    const [Addressline1, setAddressline1] = React.useState("")
    const [Addressline2, setAddressline2] = React.useState("")
    const [City, setCity] = React.useState("")
    const [State, setState] = React.useState("")
    const [Country, setCountry] = React.useState("")
    const [Zipcode, setZipcode] = React.useState("")
    const [token, setToken] = React.useState("")
    const [loading, setLoading] = React.useState(true)

    // usestate
    React.useEffect(() => {
        getTokenhandler()
    }, [])

    const getTokenhandler = async () => {
        let token = await AsyncStorage.getItem('token')
        setToken(token)
        setLoading(false)
    };

    const onPostHandler = async () => {
        setLoading(true)
        let res = await axios.post("http://shop121.herokuapp.com/address/billing/",
            {
                address_line_1: Addressline1,
                address_line_2: Addressline2,
                city: City,
                state: State,
                country: Country,
                zip_code: Zipcode
            },
            {
                headers: { Authorization: "JWT " + token }
            }
        )
        if (res.data.status === 201) {
            props.navigation.navigate("checkout")
        } else {
            setLoading(false)
            alert(res)
        }
    };



    // component rendering
    if (loading) {
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
            <ScrollView style={styles.mainContainer}>
                <View style={styles.container}>
                    <Text style={styles.tetxStyle}>Billing Address</Text>
                </View>
                <View style={styles.container}>

                    <Text style={styles.tetxStyle}>Address line 1</Text>
                      <TextInput
                        placeholderTextColor="#a5a5a5" 
                        value={Addressline1}
                        style={styles.inputStyle}
                        onChangeText={value => setAddressline1(value)} />

                    <Text style={styles.tetxStyle}>Address line 2</Text>
                      <TextInput
                        placeholderTextColor="#a5a5a5" 
                        value={Addressline2}
                        style={styles.inputStyle}
                        onChangeText={value => setAddressline2(value)} />

                    <Text style={styles.tetxStyle}>City</Text>
                      <TextInput
                        placeholderTextColor="#a5a5a5" 
                        value={City}
                        style={styles.inputStyle}
                        onChangeText={value => setCity(value)} />

                    <Text style={styles.tetxStyle}>State</Text>
                      <TextInput
                        placeholderTextColor="#a5a5a5" 
                        value={State}
                        style={styles.inputStyle}
                        onChangeText={value => setState(value)} />

                    <Text style={styles.tetxStyle}>Country</Text>
                      <TextInput
                        placeholderTextColor="#a5a5a5" 
                        value={Country}
                        style={styles.inputStyle}
                        onChangeText={value => setCountry(value)} />

                    <Text style={styles.tetxStyle}>Zipcode</Text>
                      <TextInput
                        placeholderTextColor="#a5a5a5" 
                        value={Zipcode}
                        style={styles.inputStyle}
                        onChangeText={value => setZipcode(value)} />

                    <TouchableOpacity style={{ marginTop: 20 }} >
                        <Button color="#17baa1" title="post"
                            onPress={() => onPostHandler()} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        flex: 1,
        padding: 8,
        // alignItems:"center"
        backgroundColor: "#fff",
    },
    container: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 3,
        borderColor: "rgb(204, 204, 204)",
        backgroundColor: "rgb(245, 245, 245)",
        padding: 15

    },
    tetxStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        margin: 5
    },
    inputStyle: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: "rgb(204, 204, 204)",
        backgroundColor: "#fff",
        padding: 5
    }

}

export default BillingAddress;
