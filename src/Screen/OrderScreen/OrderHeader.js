import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function OrderHeader(props) {


	return (
		<View style={styles.container}>
			<Icon style={{ color: "white", padding: 12 }}
				size={30} name="arrow-back-outline"
				onPress={() => { props.navigation.navigate("HomeScreen", { screen: 'Home' }) }} />
			<Text style={{ color: '#eee', fontSize: 25, fontWeight: 'bold', padding: 10, marginRight: 160 }}>Orders</Text>
			<MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="refresh" onPress={props.fun} />
		</View>
	)

}



const styles = {
	container: {
		width: "100%",
		flexDirection: "row",

		backgroundColor: "black"
	}
}