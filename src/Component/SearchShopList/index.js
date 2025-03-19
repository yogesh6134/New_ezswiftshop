import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';



const SearchShopList = (props) => {
	return (
		<TouchableOpacity style={{ borderColor: "#eee", padding: 10 }}
			onPress={() => props.navigation.navigate('shopdetail', { user: props.data.user, data: props.data })}>
			<View style={styles.viewStyle}>
				<View>
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
		borderWidth: 3,
		borderRadius: 10,
		borderColor: '#eee'
	},
	viewStyle2: {
		margin: 10,
		alignContent: 'center',
		justifyContent: 'center',
		width: '50%'

		
	},
	textStyle1: {
		textAlign: 'center',
		fontSize: 20,
		color: 'grey'
	},
	textStyle2: {
		textAlign: 'center',
		fontSize: 20,
		color: 'violet'

	}
})


export default SearchShopList;