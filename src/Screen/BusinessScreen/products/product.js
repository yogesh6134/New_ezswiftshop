import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Button, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import ListProductItem from './ProductListItem';
import Appheader from './header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HotelListItem from '../BNB/HotelListItem';
import HotelListItem1 from '../BNB/HotelListItem1'


export default class ProductList extends React.Component {

	state = {
		data: [],
		loading: true,
		superuser: false,
		Role: '',
		Product: 'shop',

	}


	componentDidMount() {
		this.callProductListItem()
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus',
			() => {
				this.callProductListItem();
			}
		);
	}

	componentWillUnmount = () => {
		this.willFocusSubscription.remove();
	}

	async callProductListItem() {
		var self = this;
		const token = await AsyncStorage.getItem('token');
		const role = await AsyncStorage.getItem('role');
		this.setState({ Role: role })
		if (role === 'HOTEL') {
			let res = await axios.get(`http://100.26.11.43/bnb/user/`,
				{
					headers: {
						Authorization: token
					}
				})
			// //alert(JSON.stringify(res), "shop")
			this.setState({ data: res.data })
			this.setState({ loading: false })
		}



		else if (role === 'SHOPKEEPER') {
			let res = await axios.get("http://100.26.11.43/product/listofuser",
				{
					headers: {
						Authorization: token
					}
				})
			// //alert(JSON.stringify(res))
			this.setState({ data: res.data })
			this.setState({ loading: false })
		}

     


		let res2 = await axios.get("http://100.26.11.43/auth/super-check/",
			{
				headers: {
					Authorization: token
				}
			})

		if (res2.data.status == 200) {
			this.setState({ superuser: true })
		}





	}

	ShopProduct = async () => {
		var self = this;
		const token = await AsyncStorage.getItem('token');


		let res = await axios.get("http://100.26.11.43/product/listofuser",
			{
				headers: {
					Authorization: token
				}
			})
		// //alert(JSON.stringify(res))
		this.setState({ data: res.data })
		this.setState({ loading: false })



	}

	HotelProduct = async () => {
		var self = this;
		const token = await AsyncStorage.getItem('token');


		let res = await axios.get(`http://100.26.11.43/bnb/list/`,
			{
				headers: {
					Authorization: token
				}
			})
		// //alert(JSON.stringify(res))
		this.setState({ data: res.data })
		this.setState({ loading: false })


	}

	mapProduct() {
		return this.state.data.map((t, key) => {
			return (
				this.state.Role == 'SHOPKEEPER' ? (
					<ListProductItem data={t} key={key} navigation={this.props.navigation} />
				) : (
					<HotelListItem1 data={t} key={key} navigation={this.props.navigation} />

				))
		})
	}

	adminshopProduct() {
		return this.state.data.map((t, key) => {
			return (
				// this.state.Role == 'SHOPKEEPER' ? (
				<ListProductItem data={t} key={key} navigation={this.props.navigation} />


			)
		})
	}


	adminhotelProduct() {
		return this.state.data.map((t, key) => {
			return (
				// this.state.Role == 'SHOPKEEPER' ? (
				<HotelListItem data={t} key={key} navigation={this.props.navigation} />


			)
		})
	}






	render() {
		const product = this.state.Product
		if (this.state.loading) {
			return (
				<View style={{ flex: 1 }}>
					<View style={{ backgroundColor: "black" }}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate("home")}>
							<MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="arrow-left" />
						</TouchableOpacity>
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
				<View style={{ flex: 1 }}>

					<View style={{ backgroundColor: "black" }}>
						<TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
							<MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="arrow-left" />
						</TouchableOpacity>
					</View>


					{this.state.superuser ? (

						<View>
							<View style={{ flexDirection: 'row' }}>
								<TouchableOpacity style={[styles.button]} onPress={() => {
									this.ShopProduct()
									this.setState({Product : 'shop'})
								}}>
									<Text style={[styles.buttonText]}>SHOPS</Text>

								</TouchableOpacity>

								<TouchableOpacity style={[styles.buttonhotel]} onPress={() => {this.HotelProduct()
								this.setState({Product: 'hotel'})}}>
									<Text style={[styles.buttonText]}>HOTEL</Text>
								</TouchableOpacity>
							</View>


							<ScrollView >
								<View style={styles.scrollStyle}>
									{product =='hotel' ? this.adminhotelProduct() : this.adminshopProduct()}
								
								</View>
								<View style={{ backgroundColor: "blue" }}>
								</View>
							</ScrollView>
						</View>

					) : (this.state.Role == 'SHOPKEEPER' ? (

						<View>
							{/* <TouchableOpacity style={[styles.button, { width: '100%' }]} >

								<Text style={[styles.buttonText]}>SHOPS</Text>
							</TouchableOpacity> */}

							<ScrollView >
								<View style={styles.scrollStyle}>
									{this.mapProduct()}
								</View>
								<View style={{ backgroundColor: "blue" }}>
								</View>
							</ScrollView>
						</View>
					) : (
						<View>
							{/* <TouchableOpacity style={[styles.buttonhotel, { width: '100%' }]} >

								<Text style={[styles.buttonText]}>HOTEL</Text>
							</TouchableOpacity> */}

							<ScrollView >
								<View style={styles.scrollStyle}>
									{this.mapProduct()}
								</View>
								<View style={{ backgroundColor: "blue" }}>
								</View>
							</ScrollView>
						</View>



					)
					)}
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
		backgroundColor: "#fff",
		borderColor: "#17baa1"

	},
	activitycontainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollStyle: {
		// flexDirection:'row',
		backgroundColor: '#eee',
		// marginBottom:10,
		paddingBottom:'30%'
		
	},

	button: {
		width: '50%',
		alignItems: 'center',
		paddingVertical: 15,
		// borderRadius: 30,
		elevation: 3,
		backgroundColor: 'orange',
		// marginTop: 1

		// backgroundColor: 'black'
	},

	buttonText: {
		// fontFamily: 'AdobeClean-Regular',
		fontSize: 16,
		letterSpacing: 1.25,
		color: '#fff',
	},

	buttonView: {
		alignSelf: 'center',
		marginTop: 10,
		// padding: 10,
		flexDirection: 'row',

	},

	// buttonsuperuser: {

	// 	width: '50%',
	// 	alignItems: 'center',
	// 	paddingVertical: 12,
	// 	// borderRadius: 30,
	// 	elevation: 3,
	// 	backgroundColor: 'red',
	// 	// marginTop: 1

	// 	// backgroundColor: 'black'
	// },

	buttonhotel: {
		width: '50%',
		alignItems: 'center',
		paddingVertical: 12,
		// borderRadius: 30,
		elevation: 3,
		backgroundColor: 'red',
		// marginTop: 1

		// backgroundColor: 'black'
	},
}
