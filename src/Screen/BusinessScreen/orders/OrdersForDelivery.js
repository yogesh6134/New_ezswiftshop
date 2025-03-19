import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



import axios from 'axios';
import CartList from './ListOrdersItems';
import OrderHeader from './orderheader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



export default class BusinessOrders extends Component {
	state = {
		data: [],
		loading: true,
		cart: [],
		noti_length: 0,
		Role: '',
	}


	componentDidMount() {
		// this.askPermissions()
		setInterval(() => {
			this.ordersRetrieveHandler()
		}, 10000);
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus2',
			() => {
				this.ordersRetrieveHandler();
			}
		);
	}



	componentWillUnmount() {
		this.willFocusSubscription.remove();
	}

	async ordersRetrieveHandler() {


		var self = this;
		let token = await AsyncStorage.getItem('token')

		let res = await axios.get("http://100.26.11.43/orders/shoporders/", {
			headers: { Authorization: token }
		})
		console.log(JSON.stringify(res), "shop")
		this.setState({ data: res.data, loading: false, })

	}

	reloadFun =()=>{
		this.setState({loading:true})
		this.ordersRetrieveHandler()
		
	}



	// mapOrderData() {
	// 	return this.state.data.map((t, key) => {
	// 		return (<CartList fun={this.reloadFun} data={t} key={key} />)

	// 	})
	// }


	render() {
		if (this.state.loading) {
			return (
				<View style={{ flex: 1 }}>
					<OrderHeader Fun={this.reloadFun} navigation={this.props.navigation} />
					<View style={styles.activitycontainer}>
						<View style={styles.activityStyle}>
							<ActivityIndicator size="large" color="#17baa1" />
							<StatusBar barStyle="default" />
						</View>
					</View>
				</View>
			)
		}
		else if (this.state.data.length > 0) {
			return (
				
					<View style={styles.container}>
						<OrderHeader Fun={this.reloadFun} navigation={this.props.navigation} />
						<ScrollView>
							{this.mapOrderData()}
						</ScrollView>

					</View>
				

				


			)
		} else {
			return (
				<View style={styles.container}>
					<OrderHeader Fun={this.reloadFun} navigation={this.props.navigation} />
					<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
						<Text style={{ color: "#17baa1", fontSize: 18 }}>No Order Found</Text>
						<TouchableOpacity onPress={this.reloadFun}>
							<MaterialCommunityIcons color="orange" size={50} name="reload" />
						</TouchableOpacity>
					</View>

				</View>
			)
		}
	}
}




const styles = {
	activityStyle: {
		padding: 30,
		// borderWidth:1,
		borderRadius: 5,
		backgroundColor: "#eee",
		borderColor: "#17baa1"

	},
	activitycontainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: "#eee"
	},
}



