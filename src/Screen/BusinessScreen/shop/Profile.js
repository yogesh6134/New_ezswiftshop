import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { List, Divider } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ShopProfile extends Component {
    state = {
        data: {},
        loading: false,
        superuser: false,
        ROLE: ''
    }

    componentDidMount() {
        this.apiCallHandler();
    }

    async apiCallHandler() {
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('role');
        this.setState({ ROLE: role });
        
        let endpoint = role === 'HOTEL' ? "http://100.26.11.43/bnb/hotel/detail/" : "http://100.26.11.43/shops/detail/";
        let res = await axios.get(endpoint, { headers: { Authorization: token } });
        this.setState({ data: res.data });

        let res2 = await axios.get("http://100.26.11.43/auth/super-check/", { headers: { Authorization: token } });
        if (res2.data.status == 200) {
            this.setState({ superuser: true });
        }
        this.setState({ loading: false });
    }

    render() {
        const { data, ROLE, loading, superuser } = this.state;
        
        if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#17baa1" />
                </View>
            );
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <MaterialCommunityIcons style={styles.icon} size={25} name="arrow-left" />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.editIconContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(ROLE === 'HOTEL' ? "EditAllHotelDetails" : "edit") }>
                            <MaterialCommunityIcons name="pencil" color="#fff" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.imgStyle} source={{ uri: ROLE === 'HOTEL' ? data.hotel_image : data.shop_image }} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>{ROLE === 'HOTEL' ? data.hotel_name : data.shop_name}</Text>
                        <Text style={styles.textStyle}>{ROLE === 'HOTEL' ? data.email : data.email_address}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <List.Item
                            title="Address"
                            titleStyle={{ fontSize: 20, color: "#17baa1" }}
                        />
                        <Divider />
                        <View style={styles.addressContainer}>
                            <Text style={styles.addressText}>{ROLE === 'HOTEL' ? data.address : data.address_line_1},</Text>
                            <Text style={styles.addressText}>{ROLE === 'HOTEL' ? data.address1 : data.address_line_2},</Text>
                            <Text style={styles.addressText}>{ROLE === 'HOTEL' ? data.city : data.town_city}</Text>
                        </View>
                    </View>
                    {superuser && (
                        <View style={styles.superUserContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("superuser") }>
                                <Text style={styles.superUserText}>Super User</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    headerContainer: {
        backgroundColor: "black"
    },
    icon: {
        color: "white",
        padding: 12
    },
    editIconContainer: {
        alignItems: "flex-end",
        backgroundColor: "black"
    },
    imageContainer: {
        alignItems: "center",
        backgroundColor: "black"
    },
    imgStyle: {
        height: 250,
        width: 250,
        borderRadius: 125,
        borderWidth: 2,
        backgroundColor: "white",
        borderColor: "#fff"
    },
    textContainer: {
        padding: 5,
        alignItems: "center",
        backgroundColor: "black"
    },
    textStyle: {
        color: "#fff",
        fontSize: 20,
        marginLeft: 10
    },
    infoContainer: {
        backgroundColor: "#fff",
        margin: 7,
        elevation: 3
    },
    addressContainer: {
        padding: 20,
        alignItems: "flex-end"
    },
    addressText: {
        fontSize: 20,
        color: "orange"
    },
    superUserContainer: {
        alignItems: "center",
        padding: 10,
        margin: 5
    },
    superUserText: {
        fontSize: 25,
        color: "#17baa1"
    }
};