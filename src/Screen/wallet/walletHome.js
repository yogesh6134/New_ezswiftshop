import React, { Component } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';
import { TextField } from 'react-native-material-textfield';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

const Wallet = (props) => {

  // state variables
  const [amount, setAmount] = React.useState(null)
  const [data, setData] = React.useState({})


  // useEffect
  React.useEffect(() => {
    console.log(props)
    WalletFetchHandler()
    // props.navigation.addListener('willFocus', () => {
    //   WalletFetchHandler();
    // });
  }, [])


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

  const addMoneyHandler = () => {
    if (amount > 1) {
      props.navigation.navigate('addMoney', { id: data.id, amount: amount })

    } else {
      Toast.show('AMOUNT SHOULD BE GREATER THAN 1 DOLLAR')
    }
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
        <View style={styles.container1}>
          <Icon style={{ color: "#fff", padding: 12 }}
            size={30} name="arrow-back-outline"
            onPress={() => props.navigation.goBack(null)} />
        </View>
        <ScrollView>
          <View style={{ height: 250, paddingVertical: 10, margin: 15, backgroundColor: '#17baa1', elevation: 2, borderRadius: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
              <Icon style={{ color: "white", padding: 12 }}
                size={100} name="ios-wallet"
                onPress={() => props.navigation.goBack()} />
              <Text style={{ fontSize: 35 }}>Wallet Money</Text>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: "center", justifyContent: "center", maxWidth: 350 }}>
              <Text style={{ fontSize: 40, color: "#ffffff", }}>$ {data.money}</Text>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "#e0ffff", padding: 10, margin: 15, borderRadius: 5 }}>
            <Text>Add Money To Wallet</Text>
            <TextInput
              labelFontSize={15}
              tintColor="orange"
              baseColor="#17baa1"
              label="Amount"
              value={amount}
              onChangeText={(value) => setAmount(value)} />
            <Button onPress={() => addMoneyHandler()}
              color="orange"
              style={{ color: "orange" }}
              title="Add Money" />
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
  container1: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black"
  },


}

export default Wallet;
