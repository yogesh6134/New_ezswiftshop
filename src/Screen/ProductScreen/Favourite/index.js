import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StatusBar } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavouriteProductListItems from '../../../Component/FavouriteProductListItems';


export default function Favourite(props) {

	// state={
	// 	loading:true,
	// 	data:[]
	// }
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([])


	useEffect(() => {
		getObjectHander()
	})



	const getObjectHander = async () => {
		let token = await AsyncStorage.getItem('token')
		let res = await axios.get("http://100.26.11.43/cart/order_item/infavourites/", {
			headers: { Authorization: token }
		})
		// this.setState({data:res.data})
		setData(res.data)
		// this.setState({loading:false})
		setLoading(false)


	}

	const reloadFun = () => {
		setLoading(true)
		getObjectHander()
		// this.setState({loading:true})
		// this.getObjectHander()
	}

	const productMapHandler = () => {
		return (data.map((t, key) => {
			return (
				<FavouriteProductListItems data={t} key={key} fun={reloadFun} />
			)
		}))
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
			<View style={{ flex: 1 }}>
				<View style={styles.container1}>
					<Icon style={{ color: "#fff", padding: 12 }}
						size={30} name="arrow-back-outline"
						onPress={() => { props.navigation.goBack() }} />

				</View>
				<ScrollView style={{}}>
					{() => productMapHandler()}
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
		backgroundColor: "black",
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

}