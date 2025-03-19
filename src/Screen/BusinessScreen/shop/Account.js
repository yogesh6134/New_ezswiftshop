import React, { Component } from 'react';
import { View, Text, Image, Button, AsyncStorage, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';




export default class Account extends Component {

    state = {
        data: {},
        loading: true,
        superuser: false
    }


    componentDidMount() {
        this.apiCallHandler()
    }

    async apiCallHandler() {
        const token = await AsyncStorage.getItem('token');
        let res3 = await axios.get("http://100.26.11.43/billing/profile/",
            {
                headers: {
                    Authorization: token
                }
            })
            console.log(res3.data)
        if (res3.data.status == 200) {
            this.setState({ superuser: true })
        }
        this.setState({ data: res3.data })
        this.setState({ loading: false })

    }


    render() {
        const data = this.state.data
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                    <View style={{ borderRadius: 5, backgroundColor: "#eee", padding: 30 }}>
                        <ActivityIndicator size="large" color="#17baa1" />
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: "black" }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                            <MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="arrow-left" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                       <View style={{ padding:10}}>
                           <Text style={{ paddingVertical:5}}>Total Earnings: $ {data.total_ammount}</Text>
                           <Text style={{ paddingVertical:5}}>Balance: $ {data.ammount}</Text>
                           <Text style={{ paddingVertical:5}}>Withdrawl amount: $ {data.total_ammount - data.ammount}</Text>
                       </View>
                    </ScrollView>
                </View>

            )
        }
    }
}



const styles = {
    imgStyle: {
        height: 250,
        width: 250,
        borderRadius: 400 / 2,
        borderWidth: 2,
        backgroundColor: "white",
        borderColor: "#fff"
    },
    textStyle: {
        color: "#fff",
        fontSize: 20,
        marginLeft: 10
    }
}