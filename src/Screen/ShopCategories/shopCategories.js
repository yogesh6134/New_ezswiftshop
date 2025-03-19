import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopListCategories from '../../component/ShopListCategories';


export default function ShopCategories(props) {

	const [loading, setLoading] = useState(true)
	const [data, setData] = useState([])


	useEffect(() => {
		categoriesRetrieveHandler()
	}, [])

	const categoriesRetrieveHandler = async () => {
		let res = await axios.get("http://100.26.11.43/shops/shopcat/LC/")
		setLoading(false)
		setData(res.data)
	}


	// function categoriesMapHandler() {
	// 	return data.map((t, key) => {
	// 		return (<ShopListCategories navigation={props.navigation} data={t} key={key} />)
	// 	})
	// }



	return (
		<View style={styles.viewStyle}>
			<View style={{ flexDirection: "row", backgroundColor: "black", height: 50, padding: 10, alignItems: "center" }}>
				<MaterialCommunityIcons onPress={() => { props.navigation.goBack(null) }}
					color="#fff" name="arrow-left" size={25} />

			</View>
			<ScrollView>
				<View style={{ marginTop: 10, marginBottom: 10, backgroundColor: "#e0ffff", alignItems: "center", justifyContent: "center" }}>
					<Text style={{ color: "#17baa1", padding: 5, fontSize: 20 }}>SHOP BY CATEGORY</Text>
				</View>
				<View style={{ flexWrap: "wrap", flexDirection: "row", alignItems: "center", backgroundColor: "#eee", paddingHorizontal: 15, justifyContent: 'space-between' }}>
					{data.map((t, key) => {
						return (<ShopListCategories navigation={props.navigation} data={t} key={key} />)
					})}
				</View>
			</ScrollView>
		</View>
	)
}

const styles = {
	viewStyle: {
		flex: 1,

	}
}