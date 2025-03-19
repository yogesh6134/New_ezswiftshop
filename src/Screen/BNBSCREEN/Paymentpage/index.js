
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tts from 'react-native-tts';

const Paymentpage = ({ navigation,route}) => {

  const {paymentid} = route.params
  // alert(paymentid)
  const [fromdate, setfromdate] = useState('')
  const [todate, settodate] = useState('')
  const [rooms, setroom] = useState('')
  const [price, setprice] = useState('')
  const [data, setdata] = useState('')

  useEffect(() => {
    getdata()
    return () => { };
  }, []);

  const getdata = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log(token)

    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization:'Token'+ token,
      },
    };

    fetch(`http://100.26.11.43/bnb/bill/${paymentid}`, requestOptions)
      .then(res => res.json())
      .then(resData => {
        // alert(JSON.stringify(resData))
      
        setfromdate(resData.check_in);
        settodate(resData.check_out);
        setroom(resData.no_of_rooms);
        setprice(resData.price);
        Tts.speak("Total amount is"+resData.price+"dollars ")
        setdata(resData);
        console.log('df',resData.check_in)
        
      })
      .catch(error => alert(error));
  };

  return (

   

    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.itemText}>Total Payment</Text>
        <Text style={styles.itemamount} > From Date : {fromdate}</Text>
        <Text style={styles.itemamount} > To Date : {todate}</Text>
        <Text style={styles.itemamount}>No. of Rooms : {rooms}</Text>
        <Text style={styles.itemamount}> Total Amount : $ {price}</Text>

        <View style={[styles.buttonView]}>

          <TouchableOpacity style={styles.submitbutton} onPress={() => { navigation.navigate('PaymentMethodHotel',{order_id:data.order_id})}}>

            <Text style={[styles.buttonText]}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


export default Paymentpage;

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },

  item: {
    backgroundColor: '#17baa1',
    width: width - 20,
    height: '70%',
    borderRadius: 20,
    marginTop: '30%',
    marginLeft: 10

  },

  itemText: {
    fontSize: 35,
    fontWeight: '400',
    marginTop: '25%',
    // width: '90%',
    color: 'black',
    alignSelf: 'center',
    // marginTop: 25
  },

  itemamount: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: '400',
    alignSelf: 'center',
    color: 'black',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1.25,
    color: 'black',
  },

  buttonView: {
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    // flexDirection: 'column'

  },

  submitbutton: {

    width: '50%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'white',
    marginTop: 15
  },



})

    // #17baa1