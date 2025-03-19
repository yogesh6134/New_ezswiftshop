import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet, Button } from 'react-native';
// import { ListItem } from 'native-base';

// props.navigation.navigate('productdetail2', { url: props.data.url })
// props.navigation.navigate('Product Categories', { screen: 'productdetail2', params: { url: props.data.url } })


const ShopProductListItem = (props) => {
	return (
		<TouchableOpacity onPress={() => props.navigation.navigate('productdetail1', { url: props.data.url })}>
			<View style={styles.viewStyle}>
				<View style={styles.viewStyle2}>
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<Image style={styles.imagStyle}
							source={{ uri: props.data.product_image }} />
					</View>
					<View style={{ margin: 30, flex: 1 }}>
						<Text style={styles.textStyle}>{props.data.product_name}</Text>
						<Text style={styles.textStyle2}>${props.data.product_price}</Text>
						<Text style={styles.textStyle3}>{props.data.shop_name.shop_name}</Text>
					</View>
				</View>

			</View>
		</TouchableOpacity >
	)
}
const styles = StyleSheet.create({
	viewStyle: {
		backgroundColor: '#fff',
		margin: 5,
		padding: 5,
		elevation: 3

	},
	viewStyle2: {
		// margin:10,
		// padding:10
		flexDirection: "row"

	},
	imagStyle: {
		height: 150,
		width: 170,
		borderColor: "#eee",
		borderWidth: 2
	},
	textStyle: {
		fontSize: 17,
		color: '#17baa1',
		marginLeft: 15
	},
	textStyle2: {
		color: "orange",
		fontSize: 15,
		marginLeft: 15

	},
	textStyle3: {
		color: 'grey',
		color: "#17baa1",
		fontSize: 14,
		marginLeft: 15


	}
})



export default ShopProductListItem;