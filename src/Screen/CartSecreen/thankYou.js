import React from 'react';
import { View, Text, Button, TextInput, BackHandler, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';
// import { TextField } from 'react-native-material-textfield';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';


const ThankYou = (props) => {

    // state variables

    // useEffect
    React.useEffect(() => {
        AsyncStorage.removeItem('appointment_id');
        // BackHandler.addEventListener('hardwareBackPress', () => handleBackButtonClick());
        // BackHandler.removeEventListener('hardwareBackPress', () => handleBackButtonClick());
    })

    // functions
    const handleBackButtonClick = () => {
        props.navigation.navigate("HomeScreen");
        return true;
    }


    // compenent rendering
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
                <View style={{ flexDirection: "row", height: 50, padding: 10, justifyContent: "flex-start", backgroundColor: "black" }}>
                    <MaterialCommunityIcons
                        onPress={() => 
                            
                          
                            // props.navigation.goBack()
                            props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'HomeScreen' }]
                           })
                            // props.navigation.navigate("Roompa")
                          
                        }
                        name="arrow-left" color="#fff" size={25} />
                </View>
                <View style={styles.mainContainer}>
                    <Animatable.View animation="bounceIn" style={{ backgroundColor: "#17baa1", borderRadius: 400 / 2, padding: 20, alignItems: "center" }}>
                        <MaterialCommunityIcons color="#fff" name="check" size={60} />
                    </Animatable.View>
                    <View style={{ marginTop: 30, alignItems: "center" }}>
                        <Text style={{ color: "orange", fontSize: 60 }}>
                            THANK YOU
                        </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "#17baa1", fontSize: 30 }}>
                            for shopping with us
                        </Text>
                    </View>
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
    mainContainer: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        // alignItems:"center"
        backgroundColor: "#fff",
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

export default ThankYou;
