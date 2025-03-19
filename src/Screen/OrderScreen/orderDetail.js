import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, ScrollView, Text, TouchableOpacity, Button, Image, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import * as Linking from 'expo-linking';
// import Toast from 'react-native-simple-toast';
import OrderProductItems from './orderProductMap';







function OrderDetail(props) {


	// state={
	// 	data:{},
	// 	customer:{},
	// 	shipping:{},
	// 	cart:{},
	// 	product:[],
	// 	delivery:{},
	// 	token:"",
	// 	loading:true

	// }
	const [data, setData] = useState({})
	const [customer, setCustomer] = useState({})
	const [shipping, setShipping] = useState({})
	const [cart, setCart] = useState({})
	const [product, setProduct] = useState([])
	const [delivery, setDelivery] = useState({})
	const [token, setToken] = useState("")
	const [loading, setLoading] = useState(true)


	useEffect(() => {
		getTokenhandler()
	}, [])



	async function getTokenhandler() {

		//   var self= this;
		let token = await AsyncStorage.getItem('token')
		//   this.setState({token:token})
		setToken(token)
		const { para } = props.route.params; // have to check what is this
		let res = await axios.get("http://100.26.11.43/orders/detail/" + para.id
			, {
				headers: { Authorization: token }
			})
		const data = res.data
		setData(res.data)
		setCustomer(data.customer)
		setShipping(data.shipping_address)
		setCart(data.cart)
		setProduct(data.cart.product)
		setDelivery(data.delivery_person)
		setLoading(false)

		//   this.setState({data:res.data})
		//   this.setState({customer:data.customer})
		//   this.setState({shipping:data.shipping_address})
		//   this.setState({cart:data.cart})
		//   this.setState({product:data.cart.product})
		//   this.setState({delivery:data.delivery_person})
		//   this.setState({loading:false})
	}


	function productMapHandler() {
		// const {data} 	=	this.props.route.params;
		var data = product
		return product.map((t, key) => {
			return (
				<OrderProductItems fun={reloadFun} data={t} key={key} />

			)
		}
		)
	}

	const _handlePress = () => {
		// Linking.openURL(`tel:${delivery.contact_number}`);
	};

	const _handlePress2 = () => {
		// Linking.openURL(`tel:${customer.phone_Number}`);
	};

	const reloadFun = () => {
		// this.setState({loading:true})
		setLoading(true)
		getTokenhandler()
		// this.getTokenhandler()
	}

	const cancelOrderHandler = async () => {
		// this.setState({loading:true})
		setLoading(true)
		let res = await axios.get(data.cancel_order,
			{
				headers: {
					Authorization: token
				}
			})
		// this.setState({loading:false})
		setLoading(false)
		// Toast.show(res.data.message)

	}





	if (loading) {
		return (
			<View style={{ flex: 1 }}>
				<View style={styles.container1}>
					<Icon style={{ color: "#fff", padding: 12 }}
						size={30} name="arrow-back-outline"
						onPress={() => { props.navigation.goBack() }} />

				</View>
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
			<View style={{ flex: 1, backgroundColor: "#eee" }}>
				<View style={styles.container1}>
					<Icon style={{ color: "#fff", padding: 12 }}
						size={30} name="arrow-back-outline"
						onPress={() => { props.navigation.goBack() }} />

				</View>
				<ScrollView>
					<View style={{ elevation: 3, backgroundColor: "#fff", margin: 10, }}>
						<View style={{ alignItems: "flex-start", flexDirection: "column" }}>
							<Text style={styles.textStyle1} >Order ID:</Text>
							<Text style={styles.textStyle2} >{data.order_id}</Text>

						</View>
						<View style={{ alignItems: "flex-start", flexDirection: "column" }}>
							<Text style={styles.textStyle1} >Order Status:</Text>
							<Text style={styles.textStyle2} >{data.order_status}</Text>

						</View>
						<View style={{ alignItems: "flex-start", flexDirection: "column" }}>
							<Text style={styles.textStyle1} >Delivery Type:</Text>
							<Text style={styles.textStyle2} >{data.delivery_status}</Text>

						</View>
						<View style={{ alignItems: "flex-start", flexDirection: "column" }}>
							<Text style={styles.textStyle1} >Delivery Schedule:</Text>
							<Text style={styles.textStyle2} >{data.delivery_schedule}</Text>

						</View>
						<View style={{ alignItems: "flex-start", flexDirection: "column" }}>
							<Text style={styles.textStyle1} >Ordered:</Text>
							<Text style={styles.textStyle2} >{data.ordered_date}</Text>

						</View>
					</View>
					<View style={{ elevation: 10, padding: 10, backgroundColor: "#fff", margin: 10, }}>
						<View style={{ alignItems: "center", fontStyle: "italic" }}>
							<Text style={{ fontSize: 25, color: "#17baa1", margin: 5 }}>Order Summary</Text>
						</View>
						{() => productMapHandler()}
						<View style={{ alignItems: 'center' }}>
							<Text style={styles.SummaryStyle}> Order Summary</Text>
							<View>
								<Text style={{ color: '#000' }}>Total Items : {cart.total_items}</Text>
							</View>
							<View>
								<Text style={{ color: '#000' }}>Products Total : ${cart.total_price}</Text>
							</View>
							<View>
								<Text style={{ color: '#000' }}>Service Charges : ${data.service_charge}</Text>
							</View>
							<View>
								<Text style={{ color: '#000' }}>Delivery Charges : ${data.shipping_total}</Text>
							</View>
							<View>
								<Text style={{ color: '#000' }}>Order total : ${data.total}</Text>
							</View>
						</View>
					</View>
					<View style={{ elevation: 10, margin: 10, backgroundColor: "#fff" }}>
						<View style={{ alignItems: "center", fontStyle: "italic" }}>
							<Text style={{ fontSize: 25, color: "#17baa1", margin: 5 }}>Shipping Details</Text>
						</View>
						<View>
							<View style={{ alignItems: "flex-start", flexDirection: "column" }}>
								<Text style={styles.textStyle1} >Name:</Text>
								<Text style={styles.textStyle2} >{shipping.name}</Text>

							</View>
							<View style={{ alignItems: "flex-start", flexDirection: "column" }}>
								<Text style={styles.textStyle1}>Shipping Address:</Text>
								<Text style={styles.textStyle2}>{shipping.address_line_1},</Text>
								{shipping.address_line_2 ? <Text style={styles.textStyle2}>{shipping.address_line_2},</Text> : null}
								<Text style={styles.textStyle2}>{shipping.city},</Text>
								<Text style={styles.textStyle2}>{shipping.state},</Text>
								<Text style={styles.textStyle2}>{shipping.zip_code}</Text>
							</View>
							<View style={{ alignItems: "flex-start", flexDirection: "column" }}>
								<Text style={styles.textStyle1}>Phone Numbers:</Text>
								<View style={{ flexDirection: "row" }} onPress={() => _handlePress2()}>
									<MaterialCommunityIcons name="phone" size={25} />
									<Text style={styles.textStyle2}>{shipping.phone_number}</Text>
								</View>
								<View style={{ flexDirection: "row" }} onPress={() => _handlePress2()}>
									{shipping.alternate_phone_number ?
										<MaterialCommunityIcons name="phone" size={25} /> : null}
									{shipping.alternate_phone_number ?
										<Text style={styles.textStyle2}>{shipping.phone_number}</Text> : null}
								</View>
							</View>
							<TouchableOpacity style={{ elevation: 10, margin: 10 }} onPress={() => _handlePress2()}>
								{data.shipped == false && data.cancelled == false ?
									<Button onPress={() => cancelOrderHandler()}
										color="red" title="Cancel Order" /> : null}
							</TouchableOpacity>
						</View>

					</View>

				</ScrollView>
			</View>


		)
	}

}

const styles = {
	container1: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "black"
	},
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
		backgroundColor: '#eee',
		margin: 5,

		borderColor: "#eee",
		borderWidth: 2


	},
	imgStyle: {
		height: 100,
		width: 100,
		borderWidth: 2,
		borderColor: "#fff"

	},
	imgStyle2: {
		height: 300,
		width: 300,
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
		fontSize: 20,
		color: "#17baa1"
	},
	textStyle2: {
		fontSize: 15,
		color: "orange"
	}
}

export default OrderDetail;
