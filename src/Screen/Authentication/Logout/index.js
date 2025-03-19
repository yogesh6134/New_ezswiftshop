import React, { useEffect, useState } from 'react';
import { ImageBackground, View, Text, Button, NativeEventEmitter, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tts from 'react-native-tts';
import { IMAGES } from '../../../assets';
import { COLORS } from '../../../utils/color';


function Logout(props) {

	useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
		Tts.speak("Are you sure you want to log out?");
		 
		});
	
		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	  }, [props.navigation]);

	const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
	ee.addListener('tts-start', () => {});
	ee.addListener('tts-finish', () => {});
	ee.addListener('tts-cancel', () => {});


	const clearAll = () => (
		AsyncStorage.removeItem('token'),
		AsyncStorage.removeItem('user_id'),
		AsyncStorage.clear(),
		props.navigation.replace('Auth')
	)


	return (
		<View style={styles.container}>
			{/* <ImageBackground source={IMAGES.fruitSalad} style={styles.image} resizeMode='cover'> */}
				<View style={styles.textStyle}>
					<Text style={{ fontSize: 20, color: COLORS.primary }}>
						Are you sure you want to log out?
					</Text>
				</View>
				<View style={styles.buttonStyle}>
					<Button color="red" title="Logout" onPress={clearAll} />
				</View>
				<View style={styles.buttonStyle}>
					<Button color="#17baa1" title="Cancel" onPress={() => props.navigation.goBack()} />
				</View>
			{/* </ImageBackground> */}
		</View>


	)

}


const styles = {
	container: {
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
		backgroundColor: COLORS.white
	},
	image: {
		height: '100%',
        width: '100%',
		justifyContent: "center"
	},
	textStyle: {
		alignItems: "center",
		color: COLORS.primary
	}
	,
	buttonStyle: {
		width:"90%",
		margin: 20,
		// alignItems:"center",
		justifyContent: "center"
	}
}

export default Logout;