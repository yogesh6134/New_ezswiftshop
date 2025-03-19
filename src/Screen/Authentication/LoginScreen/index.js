import React, { useState, useEffect } from 'react';
import { Image, Text, View, TextInput, Button, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import { COLORS } from '../../../utils/color';
import { useAppDispatch } from '../../../redux/hooks';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()

  const loginUserHandler = async () => {
    if (username !== '' && password !== '') {
      setLoading(true);
      let res = await axios.post("http://100.26.11.43/auth/login/", {
        username: username,
        password: password
      })
      if (res.data.token) {
        try {
          setLoading(false);
          return (
            // await AsyncStorage.setItem('token', "Token " + res.data.token)
            navigation.navigate('App') // have to change navigation 
          )
        } catch (e) {
          console.log("login--", e)
        }
      } else {
        setLoading(false)
        // Toast.show(res.data.data.message, Toast.LONG)
      }
    }
  }


  if (loading) {
    return (
      <View style={styles.activitycontainer}>
        <View style={styles.activityStyle}>
          <ActivityIndicator size="large" color={COLORS.secondary} />
          <StatusBar barStyle="default" />
        </View>
      </View>
    )
  }
  else {
    return (
      <View style={styles.viewStyle}>
        <Animatable.View animation="fadeInDownBig" style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>Welcome M!</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUpBig" style={styles.footerStyle} >
          <Text style={styles.textStyle}>Sign In</Text>
          <TextInput style={styles.textInput1}
            onChangeText={setUsername}
            placeholderTextColor={COLORS.gray}
            placeholder="Username"
            autoCaptlize={null}
            value={username} />
          <TextInput secureTextEntry={true}
            style={styles.textInput2}
            onChangeText={setPassword}
            placeholderTextColor={COLORS.gray}
            placeholder="Password"
            value={password} />
          <TouchableOpacity style={styles.buttonStyle}>
            <Button onPress={loginUserHandler}
              color={COLORS.primary} title="Sign In" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() =>
            navigation.push('Register') //have to change navigation in Register
          }>
            <Button onPress={() =>
              navigation.push('Register') //have to change navigation in Register
            }
              color={COLORS.secondary} title="Sign Up" />
          </TouchableOpacity>
        </Animatable.View>

      </View>
    )
  }
};


export default LoginScreen