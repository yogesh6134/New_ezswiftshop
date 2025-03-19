import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';



function ShopHeader(props) {

	const [input, setInput] = useState("")

	const onTextInput = value => {
		setInput(value)
	}

	return (
		<View style={styles.viewStyle}>
			<Icon style={styles.iconStyle1} name="arrow-back-outline" size={25}
				onPress={() => props.navigation.goBack(null)} />
			<TouchableOpacity style={styles.viewStyle2}

				onPress={() => props.navigation.navigate('searchShop')}>
				<Text style={styles.textStyle}>Search Shops</Text>
				<Icon style={styles.iconStyle} name="search" size={30} />
			</TouchableOpacity>
		</View>
	)

}


const styles = {
	viewStyle: {
		padding: 10,
		backgroundColor: 'black',
		flexDirection: 'row',
		alignItems: "center",
		// height: 

	},
	viewStyle2: {
		flex: 1,
		height: 50,
		marginLeft: 20,
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: 'white',
		flexDirection: 'row',
		borderColor: "#fff",
		borderRadius: 1,
		width: "80%",
		marginTop: 5

	},
	inputStyle: {
		width: "70%",
		color: "#fff",
		color: '#17baa1',
		fontSize: 15,
		marginLeft: 20,
		backgroundColor: "#fff"

	}
	,
	iconStyle: {
		color: "grey",
		alignItems: 'flex-end',
		margin: 10,
		marginTop: 5,
		// height: 10


	},
	iconStyle1: {
		color: "white",
		alignItems: 'center',


	},
	iconStyle3: {
		color: "grey",
		backgroundColor: "#fff",
		height: 40,



	},
	textStyle: {
		flex: 1,
		marginLeft: 10,
		fontSize: 20,
		color: "orange"
	}

}


export default ShopHeader;