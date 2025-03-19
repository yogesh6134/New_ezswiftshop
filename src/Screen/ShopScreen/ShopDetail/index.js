import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopProductListItem from '../../../component/ShopProductListItem';



export default function ShopDetail(props) {

	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		shopProductFetch()
	}, [])

	async function shopProductFetch() {
		// console.log(props.route.params)
		const { user } = props.route.params	//this.props.route.params;//have to pass props in navigation
		let res = await axios.get("http://100.26.11.43/product/shop_product/" + user)
		// this.setState({data:res.data})
		// console.log(res.data)
		setData(res.data)
		setLoading(false)
		// this.setState({loading:false})
	}

	// const shopProductMap = () => {
	// 	return data.map((t, key) => {
	// 		return (<ShopProductListItem data={t} key={key} navigation={props.navigation} />)
	// 	})
	// }



	const shopdata = props.route.params.data	//this.props.route.params;//have to usec route

	if (loading) {
		return (
			<View style={{ flex: 1 }}>
				<Icon style={styles.iconStyle} name="arrow-back-outline" size={30}
					onPress={() => { props.navigation.goBack() }} />
				<View style={styles.container2}>
					<Image style={styles.imageStyle} source={{ uri: shopdata.shop_image }} />
					<Text style={styles.textStyle1}>{shopdata.shop_name}</Text>
					<View style={{ flexDirection: "row", alignItems: 'center' }}>
						<Icon name="ios-pin" size={20} />
						<Text style={styles.textStyle2}>{shopdata.town_city}</Text>
					</View>
					<View style={{ flexDirection: "row", alignItems: 'center' }}>
						<MaterialCommunityIcons name="clock" size={20} />
						<Text style={styles.textStyle2}>{shopdata.timming}</Text>
					</View>
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
			<View style={styles.container}>

				<Icon style={styles.iconStyle} name="arrow-back-outline" size={30}
					onPress={() => { props.navigation.goBack() }} />
				<ScrollView>
					<View style={styles.container2}>
						<Image style={styles.imageStyle} source={{ uri: shopdata.shop_image }} />
						<Text style={styles.textStyle1}>{shopdata.shop_name}</Text>
						<View style={{ flexDirection: "row", alignItems: 'center' }}>
							<Icon color="orange" name="ios-pin" size={20} />
							<Text style={styles.textStyle2}>{shopdata.town_city}</Text>
						</View>
						<View style={{ flexDirection: "row", alignItems: 'center' }}>
							<MaterialCommunityIcons color="orange" name="clock" size={20} />
							<Text style={styles.textStyle2}>{shopdata.timming}</Text>
						</View>
					</View>
					{data.map((t, key) => {
						return (<ShopProductListItem data={t} key={key} navigation={props.navigation} />)
					})}
				</ScrollView>
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
	imageStyle: {
		height: 200,
		width: 200,
		borderColor: "#eee",
		borderWidth: 2,
		borderRadius: 10,
		backgroundColor: "#fff"


	},
	container: {
		backgroundColor: "#eee",
		flex: 1,
		// padding:5
	},
	container2: {
		// flexDirection:"row",
		alignItems: "center",
		backgroundColor: "black",
		borderColor: "grey",
		padding: 20,
		elevation: 10,
		// borderWidth:2,
		// borderRadius:10

	},
	viewStyle2: {
		margin: 10,
		alignContent: 'center',
		justifyContent: 'center',
		backgroundColor: "#17baa1"
	},
	textStyle1: {
		textAlign: 'center',
		fontSize: 25,
		color: 'white'
	},
	textStyle2: {
		textAlign: 'center',
		fontSize: 20,
		color: '#fff',
		margin: 5

	},
	iconStyle: {
		color: "white",
		padding: 10,
		backgroundColor: "black"

	},
}



