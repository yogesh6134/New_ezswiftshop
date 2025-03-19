import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import ShopHeader from '../../../component/ShopHeader';
import ListShop from '../../../component/ShopList';



export default function Shop(props) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false)


	useEffect(() => {
		setLoading(true)
		console.log(props)
		getShopHandler()
	}, [])



	async function getShopHandler() {
		let res = await axios.get('http://100.26.11.43/shops/')
		setData(res.data)
		setLoading(false)
	}


	// const mapShopForList = () => {
	// 	return data.map((t, key) => {
	// 		return (<ListShop navigation={props.navigation} data={t} key={key} />)
	// 	})
	// }



	if (loading) {
		return (
			<View style={{ flex: 1 }}>
				<ShopHeader navigation={props.navigation} />
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
			<View style={{ flex: 1, backgroundColor: "#fff" }}>
				<View>
					<ShopHeader navigation={props.navigation} />
				</View>
				<ScrollView >
					<View>
						{data.map((t, key) => {
							return (
								<ListShop navigation={props.navigation} data={t} key={key} />)
						})}
					</View>
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
	contentStyle: {
		margin: 5,
		backgroundColor: "#fff",
	}
}