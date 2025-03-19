import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button, ScrollView, TouchableOpacity, Image, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import Icon from "react-native-vector-icons/Ionicons"




export default function CategoryShopList(props) {

	const [input, setInput] = useState("")
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)


	useEffect(() => {
		onButtonPressHandler()
	}, [])


	const onButtonPressHandler = async () => {
		setLoading(true)
		const { id } = props.route.params;
		// var self =this;
		await fetch("http://100.26.11.43/shops/search/?category=" + id)
			.then(response => response.json())
			.then(data => {
				setData(data)
				setLoading(false)
			}
			);
	}


	// const mapProduct = () => {
	// 	return data.map((t, key) => {
	// 		return (<TouchableOpacity style={{ borderColor: "#eee", padding: 10 }}
	// 			onPress={() => props.navigation.navigate('shopdetail2', { user: t.user, data: t })}>
	// 			<View style={styles.viewStyle4} key={key}>
	// 				<View style={{ elevation: 3, backgroundColor: "#ffffff", }}>
	// 					<Image style={styles.imgStyle}
	// 						source={{ uri: t.shop_image }}
	// 					/>
	// 				</View>
	// 				<View style={styles.viewStyle2} key={key}>
	// 					<Text style={styles.textStyle1}>{t.shop_name}</Text>
	// 					<View style={{ flexDirection: "row", alignItems: 'center' }}>
	// 						<Icon name="md-pin" size={20} />
	// 						<Text style={styles.textStyle2}>{t.town_city}</Text>
	// 					</View>
	// 				</View>
	// 			</View>
	// 		</TouchableOpacity>)
	// 	})
	// }




	if (loading) {
		return (
			<View style={{ flex: 1 }}>
				<View style={styles.viewStyle}>
					<Icon name="arrow-back-outline" size={25} color="#eee"
						style={{ margin: 5 }}
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
				<View style={styles.viewStyle}>
					<Icon name="arrow-back-outline" size={25} color="#eee"
						style={{ margin: 5 }}
						onPress={() => { props.navigation.goBack() }} />
				</View>
				<ScrollView>
					{
						data.map((t, key) => {
							return (
								<TouchableOpacity key={key} style={{ borderColor: "#eee", padding: 10 }}
									onPress={() => props.navigation.navigate('shopdetail2', { user: t.user, data: t })}>
									<View style={styles.viewStyle4}>
										<View style={{ elevation: 3, backgroundColor: "#ffffff", }}>
											<Image style={styles.imgStyle}
												source={{ uri: t.shop_image }}
											/>
										</View>
										<View style={styles.viewStyle2}>
											<Text style={styles.textStyle1}>{t.shop_name}</Text>
											<View style={{ flexDirection: "row", alignItems: 'center' }}>
												<Icon name="md-pin" size={20} />
												<Text style={styles.textStyle2}>{t.town_city}</Text>
											</View>
										</View>
									</View>
								</TouchableOpacity>
							)
						})
					}
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
	viewStyle: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: 'black',
	},
	viewStyle3: {
		backgroundColor: '#fff',
		margin: 5,

		borderColor: "#eee",
		borderWidth: 2,
		padding: 5

	},
	viewStyle4: {
		backgroundColor: '#eee',
		flexDirection: "row",
		borderWidth: 2,
		borderColor: '#eee',
		padding: 5,
		borderColor: "#eee",
		elevation: 2,


	},
	imgStyle: {
		height: 150,
		width: 150,
		borderColor: '#eee',

	},
	viewStyle2: {
		flex: 1,
		margin: 10,
		alignContent: 'center',
		justifyContent: 'center',
	},
	textStyle1: {
		// textAlign:'center',
		fontSize: 20,
		color: '#17baa1'
	},
	textStyle2: {
		// textAlign:'center',
		fontSize: 20,
		color: 'orange'

	}
}