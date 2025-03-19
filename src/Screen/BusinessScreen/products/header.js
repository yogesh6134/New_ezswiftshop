import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class AppHeader extends React.Component {

	render() {
		return (
			// <Header style={styles.headerStyle}>
			<View style={styles.headerStyle} >
				<MaterialCommunityIcons style={{ color: "white", padding: 12 }}
					size={30} name="menu"
					onPress={() => { this.props.navigation.toggleDrawer() }} />
				<Image style={{ width: 250, height: 60 }} resizeMode={"contain"} source={require('../assets/EZ-Swift-type-logo_BUSINESS.png')} />
				<MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={30} name="account" onPress={() => this.props.navigation.navigate('profile')} />


			 </View>
		)
	}
}

const styles = StyleSheet.create({
	headerStyle: {
		flexDirection: 'row',
		backgroundColor: 'black',
		justifyContent: "space-between"


	},
	viewStyle: {

		backgroundColor: 'orange',
	}




})