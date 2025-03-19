import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import OrderHeader from './OrderHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import OrderList from './orderList';


export default function Orders(props) {

	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)


	useEffect(() => {
		console.log(props)
		ordersRetrieveHandler()
	}, [])

	// 	componentDidMount(){
	// 			this.ordersRetrieveHandler()
	// 	this.willFocusSubscription = this.props.navigation.addListener(
	// 	      'willFocus2',
	// 	      () => {
	// 	        this.ordersRetrieveHandler();
	// 	      }
	// 	    );
	// 	  }

	//   componentWillUnmount() {
	//     this.willFocusSubscription.remove();
	//   }

	async function ordersRetrieveHandler() {
		let token = await AsyncStorage.getItem('token')
		let res = await axios.get("http://100.26.11.43/orders/", {
			headers: { Authorization: token }
		})
		setData(res.data)
		setLoading(false)
	}

	const refreshOrdersHandler = () => {
		setLoading(true)
		ordersRetrieveHandler()
	}


	// function mapOrderData() {
	// 	return data.map((t, key) => {
	// 		return (<OrderList
	// 			navigation={props.navigation}
	// 			data={t} key={key} />)
	// 	})
	// }



	if (loading) {
		return (
			<View style={{ flex: 1 }}>
				<OrderHeader navigation={props.navigation} />
				<View style={styles.activitycontainer}>
					<View style={styles.activityStyle}>
						<ActivityIndicator size="large" color="#17baa1" />
						<StatusBar barStyle="default" />
					</View>
				</View>
			</View>
		)
	}
	else if (data.length >> 0) {
		return (
			<View style={styles.container}>
				<OrderHeader fun={refreshOrdersHandler} navigation={props.navigation} />
				<ScrollView style={{}}>
					{
						data.map((t, key) => {
							return (<OrderList
								navigation={props.navigation}
								data={t} key={key} />)
						}
						)}
				</ScrollView>
			</View>

		)
	} else {
		return (
			<View style={styles.container}>
				<OrderHeader fun={refreshOrdersHandler} navigation={props.navigation} />
				<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<Text style={{ fontSize: 25, color: "#17baa1" }}>Nothing in the bag</Text>
					<TouchableOpacity onPress={() => { props.navigation.navigate('Shops') }}>
						<Text style={{ fontSize: 15, color: "orange" }}>CONTINUE SHOPPING</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

}




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
		flex: 1,

	},
}