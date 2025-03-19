import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IMAGES } from '../../assets';


// var logo = require('./assets/IMG-20200620-WA0002.jpg')



export default function Aboutus(props) {

	return (
		<View style={{ flex: 1 }}>
			<View style={{ justifyContent: "center", padding: 10 }}>
				<Icon onPress={() => props.navigation.goBack()} name='arrow-back-outline' size={30} />
			</View>
			<View>
				<View style={{ alignItems: "center" }}>
					<Image style={styles.imgStyle} source={IMAGES.ezSwiftLogo} />
				</View>
				<View style={{ alignItems: "center", justifyContent: 'center', marginTop: 90, margin: 5 }}>
					<Text style={{ fontSize: 12 }}>
						EZSwiftShops is a NYC based platform that is created to provide the people easy access to grocery stores and restaurants from our neighborhood as well as abroad.
					</Text>
				</View>
				<View style={{ alignItems: "center", justifyContent: 'center', marginTop: 20, margin: 5 }}>
					<Text style={{ fontSize: 12 }}>
						EZSwiftShops gives you the cashier less experience just like modern day toll booths. Our app makes your phone your cashier and you never have to wait in line for checkout. Swift and EZ! When in store, simply show your digital barcode as you exit.
					</Text>
				</View>
				<View style={{ alignItems: 'center', marginTop: 160 }}>
					<Text style={{ color: 'grey' }}>Developed by LEANVIA</Text>
				</View>
			</View>
		</View>
	)
}


const styles = {
	imgStyle: {
		height: 180,
		width: 180
	}
}