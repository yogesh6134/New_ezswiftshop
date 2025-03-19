import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button, ScrollView, TouchableOpacity, Image, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import Icon from "react-native-vector-icons/Ionicons"




export default function CategoryProductsList(props) {

	const [input, setInput] = React.useState("")
	const [data, setData] = React.useState([])
	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		onButtonPressHandler()
	}, [])


	const onButtonPressHandler = async () => {
		setLoading(true)
		const { id } = props.route.params;///have to import id from route
		// var self =this;
		console.log(id, "jkl")
		await fetch("http://100.26.11.43/product/search/?category=" + id)
			.then(response => response.json())
			.then(data => {
				setData(data)
				setLoading(false)
			});
		// self.setState({data:response.data})
		// self.setState({loading:false})
	}


	// const mapProduct = () => {
	// 	return data.map((t, key) => {
	// 		return (<TouchableOpacity key={key} onPress={() => props.navigation.navigate('productdetail2', { url: t.url })}>
	// 			<View key={key} style={styles.viewStyle3}>

	// 				<View style={{ elevation: 3 }}>
	// 					<Image style={styles.imagStyle}
	// 						source={{ uri: t.product_image }} />
	// 				</View>
	// 				<View style={{ flex: 1, margin: 5, padding: 12 }}>
	// 					<Text style={styles.textStyle}>{t.product_name}</Text>
	// 					<Text style={styles.textStyle2}>${t.product_price}</Text>
	// 					<Text style={styles.textStyle3}>{t.shop_name.shop_name}</Text>
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
					{data.map((t, key) => {
						return (<TouchableOpacity key={key} onPress={() => props.navigation.navigate('productdetail2', { url: t.url })}>
							<View key={key} style={styles.viewStyle3}>

								<View style={{ elevation: 3 }}>
									<Image style={styles.imagStyle}
										source={{ uri: t.product_image }} />
								</View>
								<View style={{ flex: 1, margin: 5, padding: 12 }}>
									<Text style={styles.textStyle}>{t.product_name}</Text>
									<Text style={styles.textStyle2}>${t.product_price}</Text>
									<Text style={styles.textStyle3}>{t.shop_name.shop_name}</Text>
								</View>
							</View>
						</TouchableOpacity>)
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
	viewStyle: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: 'black',
	},
	viewStyle2: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		border: 2,
		borderRadius: 3,
		marginTop: 5
	},
	inputStyle: {
		width: "85%",
		color: '#17baa1',
		fontSize: 18,
		// marginLeft:20,
		height: 25
	},
	buttonStyle: {
		width: "20%",
		color: '#fff',
		height: 25,

	},
	viewStyle3: {
		backgroundColor: '#fff',
		flexDirection: "row",
		// justifyContent:"center",
		alignItems: "center",
		elevation: 3,
		margin: 6,
		flex: 1,
		// borderRadius:5,
		borderColor: "#17baa1",
		// borderWidth:5,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,

	},
	viewStyle4: {
		// alignItems:"center",
		// justifyContent:"center",
		backgroundColor: "#fff",
		flex: 1,
		width: 170,
		flexWrap: "wrap",
		borderRadius: 10,
		borderColor: "red",
		borderWidth: 2,
		// margin:10,
		// padding:10
		// flexDirection:"row"

	},
	imagStyle: {
		height: 150,
		width: 170,
		borderColor: "#eee",
		borderWidth: 2,
	},
	textStyle: {
		color: '#17baa1',
		fontSize: 20,
	},
	textStyle2: {
		color: 'orange',
		fontSize: 15,

	},
	textStyle3: {
		color: '#17baa1',


	}
}