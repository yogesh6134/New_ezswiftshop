import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';



const ListShop = (props) => {
	console.log('shops',props.data)
	return (
		<TouchableOpacity style={{ borderColor: "#eee", padding: 10 }}
			onPress={() => props.navigation.navigate('shopdetail', { user: props.data.user, data: props.data })}>
			<View style={styles.viewStyle}>
				<View style={{ elevation: 3, backgroundColor: "#ffffff", }}>
					<Image style={styles.imgStyle}
						source={{ uri: props.data.shop_image }}
					/>
				</View>
				<View style={styles.viewStyle2}>
					<Text style={styles.textStyle1}>{props.data.shop_name}</Text>
					<View style={{ flexDirection: "row", alignItems: 'center' }}>
						<Icon name="pin-sharp" size={20} />
						<Text style={styles.textStyle2}>{props.data.town_city}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>

	)
}



const styles = StyleSheet.create({
	viewStyle3: {
		backgroundColor: '#fff',
		margin: 5,

		borderColor: "#eee",
		borderWidth: 2,
		padding: 5

	},
	viewStyle: {
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
})


export default ListShop;