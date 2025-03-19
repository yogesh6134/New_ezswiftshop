import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { AuthSelector, fetchRegisterCustomer } from '../../../redux/slice/onBoardingSlice';
import { COLORS } from '../../../utils/color';




const RegisterProfile = () => {
  const [first_name, setFirst_name] = useState("")
  const [last_name, setLast_name] = useState("")
  const [phone_Number, setPhone_number] = useState("")
  const [town_city, setTown_city] = useState("")
  const [zip_code, setZip_code] = useState("")
  const loginToken = useAppSelector(AuthSelector)
  const dispatch = useAppDispatch()

  console.log('object=======loginToken==:', loginToken)

//   useEffect(() => {
//     getTokenhandler()
//   })


//   async function getTokenhandler() {
//     // let token = await AsyncStorage.getItem('token')
//     // setToken(token)
//     //   this.setState({token:token})
//   }


  const onPostHandler = async () => {
    const data = {
        first_name,
        last_name,
        phone_Number,
        town_city,
        zip_code
    }


    // setLoading(true)
    // var token     = token
    dispatch(fetchRegisterCustomer(data))
    // let res = await axios.post("http://100.26.11.43/customer/create/",
    //   {
    //     first_name: first_name,
    //     last_name: last_name,
    //     phone_Number: phone_Number,
    //     town_city: town_city,
    //     zip_code: zip_code
    //   },
    //   {
    //     headers: { Authorization: token }
    //   }
    // )
    // if (res.data.status === 201) {
    //   props.navigation.navigate('login')
    // // //   Toast.show("successfully created please login..", Toast.LONG)

    // } else {
    //   //   this.setState({loading:false})
    // //   setLoading(false)
    //   console.log(res.data.message)
    // // //   Toast.show(res.data.message, Toast.LONG)
    // }
  }


    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.tetxStyle}>Create Profile</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.tetxStyle}>First Name</Text>
          <TextInput
            value={first_name}
            style={styles.inputStyle}
            onChangeText={setFirst_name} />

          <Text style={styles.tetxStyle}>Last Name</Text>
          <TextInput
            value={last_name}
            style={styles.inputStyle}
            onChangeText={setLast_name} />

          <Text style={styles.tetxStyle}>Phone</Text>
          <TextInput
            value={phone_Number}
            style={styles.inputStyle}
            onChangeText={setPhone_number} />

          <Text style={styles.tetxStyle}>City</Text>
          <TextInput
            value={town_city}
            style={styles.inputStyle}
            onChangeText={setTown_city} />


          <Text style={styles.tetxStyle}>Zipcode</Text>
          <TextInput
            value={zip_code}
            style={styles.inputStyle}
            onChangeText={setZip_code} />

          <TouchableOpacity style={{ marginTop: 20 }} >
            <Button color={COLORS.primary} title="create"
              onPress={onPostHandler} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }


  export default RegisterProfile