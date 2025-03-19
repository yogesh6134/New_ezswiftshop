import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { ListItem } from 'native-base';
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { IMAGES } from '../../assets';


var logoImage = require('../assets/hiclipart.com.png')
var logoImage2 = require('../assets/hicli.png')

const ProfileScreen = ({navigation}) => {

	const [data, setData] = useState({})

	useEffect(() => {
		getDetailHandler()
	}, [])


	async function getDetailHandler() {
		let token = await AsyncStorage.getItem("token")
		let res = await axios.get("http://100.26.11.43/customer/detail/", {
			headers: {
				Authorization: token
			}
		})
		// this.setState({data:res.data})
		setData(res.data)
	}



	return (
		<View style={{ backgroundColor: "" }}>
			<View style={{ backgroundColor: "black" }}>
				<Icon onPress={() => navigation.goBack()}
					style={{ color: "white", padding: 12, marginTop: 5 }} size={25} name="arrow-back-outline" />
			</View>
			<View style={{ backgroundColor: "black", alignItems: "center" }}>
				<View style={{ flexDirection: "row" }}>
					<Animatable.Image animation="bounceIn"
						style={styles.imgStyle} source={IMAGES.hiclipart} />
					<Text style={{ color: "#fff", fontSize: 20, marginTop: 70 }}>or</Text>
					<Animatable.Image animation="bounceIn"
						style={styles.imgStyle} source={IMAGES.hicli} />
				</View>
				<Text style={{ color: "#fff", margin: 10, fontSize: 30 }}>
					{data.first_name}
				</Text>
				<Text style={{ color: "#fff", margin: 5 }}>
					{data.phone_Number}
				</Text>
				<Text style={{ color: "#fff" }}>
					{data.email}
				</Text>
			</View>
			<View style={{ backgroundColor: "black" }}>
				<Icon onPress={() => { }}
					style={{ margin: 5, color: "white", marginRight: 20, alignSelf: 'flex-end', }}
					size={25} name="create" />
			</View>
			<View style={{ backgroundColor: "#eee", margin: 10 }}>

				<View>
					<Text>
						My Orders
					</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate("Orders")}>
					<View style={{ alignItems: "flex-end" }}>
						<Text style={{ color: "#17baa1", margin: 10 }}>
							View ALL ORDERS
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)

};


export default ProfileScreen;


const styles = {

	imgStyle: {
		margin: 10,
		height: 100,
		width: 100,
		borderColor: "#fff",
		borderWidth: 2,
		borderRadius: 400 / 2,
		backgroundColor: "white"
	}
}
