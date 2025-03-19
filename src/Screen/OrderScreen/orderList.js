import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, BackHandler, Image, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';





function OrderList(props) {



	const [data, setData] = useState(props.data)
	const [cart, setCart] = useState(props.data.cart)
	const [product, setProduct] = useState(props.data.cart.product)
	const [token, setToken] = useState("")
	const [loading, setLoading] = useState(false)


	// componentDidMount(){
	// 	}


	async function getTokenhandler() {
		//   var self= this;
		let token = await AsyncStorage.getItem('token')
		//   this.setState({token:token})
		setToken(token)
	}

	const AcceptOrderHandler = async () => {
		// this.setState({loading:true})
		setLoading(true)
		let token = await AsyncStorage.getItem('token')
		let res = await axios.get(data.accept_order, {
			headers: { Authorization: token }
		})
		setLoading(false)
		alert(res.data.message)
		props.fun()
	}

	const RejectOrderHandler = async () => {
		// this.setState({loading:true})
		setLoading(true)
		let token = await AsyncStorage.getItem('token')
		let res = await axios.get(data.cancel_order, {
			headers: { Authorization: token }
		})
		// this.setState({loading:false})
		setLoading(false)
		alert(res.data.message)
		props.fun()
	}

	function productMapHandler() {
		return product.map((t, key) => {
			return (
				<View key={key} style={styles.container}>
					<View style={{ flexDirection: "row", margin: 5 }}>
						<View>
							<Image style={styles.imgStyle}
								source={{ uri: t.product.product_image }} />

						</View>
						<View key={key} style={{ margin: 5, flex: 1 }} >
							<Text style={{ marginLeft: 10, color: "#17baa1", fontSize: 15, fontWeight: "bold" }}>{t.product.product_name}</Text>
							<Text style={{ marginLeft: 10, color: "orange", }}>${t.price}</Text>
							<View style={{ flexDirection: "row", marginLeft: 10 }}>
								<Text style={{ color: "#17baa1" }}>Qty : {t.quantity}</Text>
							</View>
						</View>
					</View>
				</View>

			)
		}
		)
	}



	if (loading) {
		return (
			<View style={styles.container}>
				<View style={styles.activityStyle}>
					<ActivityIndicator size="large" color="#17baa1" />
					<StatusBar barStyle="default" />
				</View>
			</View>
		)
	}
	else {
		return (
			<TouchableOpacity style={{ backgroundColor: "#eee" }} onPress={() => { props.navigation.navigate('orderDetail', { para: props.data }) }}>
				<View style={{ flex: 1, marginLeft: 5 }}>
					<View style={{ flexDirection: "row" }}>
						<Text style={styles.textStyle1} >Order </Text>
						<Text style={styles.textStyle2} >#{data.order_id}</Text>

					</View>
					<View style={{ margin: 10, elevation: 2, borderColor: "#D3D3D3", borderWidth: 1 }}>
						<View style={{ backgroundColor: "#fff", }}>

							<Text style={{ margin: 2, padding: 1, borderRadius: 400 / 2, backgroundColor: "#eee", marginRight: 20, fontWeight: "bold", fontSize: 15, color: "#17baa1", alignSelf: "flex-end" }}>
								{data.order_status}</Text>

						</View>
						{productMapHandler()}
					</View>
				</View>
			</TouchableOpacity>
		)
	}

}

export default OrderList;



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
		backgroundColor: '#fff',
		flex: 1,
		// borderRadius:5,
		// padding:10,
		// margin:5,
		// marginTop:10,



	},
	imgStyle: {
		height: 100,
		width: 100,
		borderWidth: 2,
		borderColor: "#eee"

	},
	SummaryStyle: {
		alignItems: "center",
		color: "grey"
	},

	buttonStyle: {
		flexDirection: "row",
		backgroundColor: "#17baa1",
		alignItems: "center",
		padding: 5,
		borderRadius: 5
	},
	buttonStyle2: {
		flexDirection: "row",
		backgroundColor: "red",
		alignItems: "center",
		padding: 5,
		borderRadius: 5
	},
	textStyle1: {
		fontSize: 15,
		color: "#17baa1"
	},
	textStyle2: {
		fontSize: 15,
		color: "orange"
	}
}



