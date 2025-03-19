import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, Button, Image, ActivityIndicator, StatusBar } from 'react-native';
// import { ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

// import * as Speech from 'expo-speech';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-simple-toast';




function FavouriteProductListItems(props) {



	const [data, setData] = useState(props.data);
	const [contents, setContents] = useState(props.data.content);
	const [token, setToken] = useState("")
	const [loading, setLoading] = useState(false)



	useEffect(() => {
		getTokenhandler()
	})




	async function getTokenhandler() {
		//   var self= this;
		let token = await AsyncStorage.getItem('token')
		//   this.setState({token:token})
		setToken(token)
	}

	const add_to_favourites = async () => {
		let res = await axios.get(data.add_in_favourites)
		// Toast.show(res.data.message)
		props.fun()
	}

	const add_to_cart = async () => {
		let res = await axios.get("http://100.26.11.43/cart/order_item/infavourites/add_to_cart/" + data.item_id,
			{
				headers: {
					Authorization: token
				}
			})
		// Toast.show(res.data.message)
		props.fun()
	}

	function productContentMapHandler() {

		return contents.map((t, key) => {
			return (
				<View key={key} style={{ elevation: 3, backgroundColor: "#fff", height: 25, margin: 5, alignItems: "center" }}>
					<Text style={{ fontSize: 15, color: "orange" }}>{t.content}</Text>
				</View>
			)
		})

	}


	// var data = data;
	return (
		<View style={styles.container}>
			{/* <ListItem>
				<View>
					<Image style={styles.imgStyle}
						source={{ uri: data.product.product_image }} />

				</View>
				<View style={{ margin: 5, flex: 1 }} >
					<Text style={{ marginLeft: 25, color: "orange", fontSize: 15, }}>{data.product.product_name}</Text>
					<Text style={{ marginLeft: 25, color: "#17baa1", fontSize: 15, fontWeight: "bold" }}>${data.product.product_price}</Text>
				</View>
				<TouchableOpacity style={{ elevation: 3 }} onPress={() => add_to_favourites()}>
					<View style={{}}>
						{data.inFavourite ? <Icon name="md-heart" color="red" size={35} /> : null}
						{data.inFavourite === false ? <Icon name="md-heart" color="#dcdcdc" size={35} /> : null}
					</View>
				</TouchableOpacity>

			</ListItem> */}
			<View style={{ elevation: 2 }}>
				<View style={{ alignItems: "center" }}>
					{(contents.length >> 0) ? <Text style={{ color: "#17baa1", fontSize: 17 }}>Product Contents</Text> : null}
				</View>
				{() => productContentMapHandler()}
			</View>
			<View style={{ margin: 10 }}>
				<Button onPress={() => add_to_cart()}
					color="#17baa1" title="repeat order" />
			</View>
		</View>
	)

}

const styles = {
	container: {
		backgroundColor: '#e0ffff',
		flex: 1,
		margin: 10,
		padding: 10,
		elevation: 3
	},
	imgStyle: {
		height: 150,
		width: 150,
		borderWidth: 2,
		borderColor: "#fff"

	},
}

export default FavouriteProductListItems;
