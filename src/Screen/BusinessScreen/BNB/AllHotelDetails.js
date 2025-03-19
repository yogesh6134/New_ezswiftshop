import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker'; // Change this for React Native CLI
import CheckBox from '@react-native-community/checkbox'; // Use a compatible checkbox library
import { Picker } from '@react-native-picker/picker'; // Assuming you're using the Picker package

var backgroundImage = require("../assets/Screenshot_20200703-173531.png");

const AllHotelDetails = ({ navigation, route }) => {
	const id = route.params.id;

	const pickImage = () => {
		const options = {
			mediaType: 'photo',
			quality: 1,
		};

		launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else {
				setImage(response.assets[0].uri);
			}
		});
	};

	const [HotelName, setHotelName] = useState('');
	const [Address, setAddress] = useState('');
	const [Address1, setAddress1] = useState('');
	const [City, setCity] = useState('');
	const [Country, setCountry] = useState('');
	const [PinCode, setPinCode] = useState('');
	const [PhoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [Description, setDescription] = useState('');
	const [image, setImage] = useState(null);

	useEffect(() => {
		getData();
		return () => {};
	}, []);

	const getData = () => {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		fetch(`http://100.26.11.43/bnb/hotel/${id}`, requestOptions)
			.then(res => res.json())
			.then(resData => {
				setHotelName(resData.hotel_name);
				setAddress(resData.address);
				setAddress1(resData.address1);
				setCity(resData.city);
				setCountry(resData.country);
				setPinCode(JSON.stringify(resData.pin_code));
				setPhoneNumber(resData.phone_num);
				setEmail(resData.email);
				setDescription(resData.description);
				setImage(resData.hotel_image);
			})
			.catch(error => console.log(error));
	};

	const delData = () => {
		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		fetch(`http://100.26.11.43/bnb/hotel/${id}`, requestOptions)
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(err => console.log(err));
	};

	return (
		<View>
			<View style={{ backgroundColor: "black" }}>
				<TouchableOpacity onPress={() => { navigation.navigate('AllHotels') }} >
					<MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="arrow-left" />
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.mainContainer}>
				<View style={styles.container}>
					<Text style={styles.tetxStyle}>Hotel image</Text>
					<TouchableOpacity onPress={pickImage} style={{ borderRadius: 2, borderColor: "rgb(204, 204, 204)", borderWidth: 1 }}>
						<ImageBackground source={backgroundImage} style={styles.imgStyle}>
							{image && <Image source={{ uri: `http://100.26.11.43/${image}` }} style={{ width: 307, height: 200, resizeMode: 'cover' }} />}
						</ImageBackground>
					</TouchableOpacity>

					<View style={styles.fieldSet}>
						<Text style={[styles.legend, styles.text]}>Full Name / Company Name *</Text>
						<TextInput
							style={[styles.TextInput, styles.text]}
							value={HotelName}
							onChangeText={text => setHotelName(text)}
						/>
					</View>

					<View style={styles.fieldSet}>
						<Text style={[styles.legend, styles.text]}>Address *</Text>
						<TextInput
							style={[styles.TextInput, styles.text]}
							value={Address}
							onChangeText={text => setAddress(text)}
						/>
					</View>

					<View style={styles.fieldSet}>
						<Text style={[styles.legend, styles.text]}>Address1 *</Text>
						<TextInput
							style={[styles.TextInput, styles.text]}
							value={Address1}
							onChangeText={text => setAddress1(text)}
						/>
					</View>

					<View style={styles.fieldSet}>
						<Text style={[styles.legend, styles.text]}>City *</Text>
						<TextInput
							style={[styles.TextInput, styles.text]}
							value={City}
							onChangeText={text => setCity(text)}
						/>
					</View>

					<View style={styles.fieldSet}>
						<Text style={[styles.legend, styles.text]}>Country *</Text>
						<TextInput
							style={[styles.TextInput, styles.text]}
							value={Country}
							onChangeText={text => setCountry(text)}
						/>
					</View>

					<View style={styles.fieldSet}>
						<Text style={[styles.legend, styles.text]}>PinCode *</Text>
						<TextInput
							style={[styles.TextInput, styles.text]}
							value={PinCode}
							onChangeText={text => setPinCode(text)}
						/>
					</View>

					<View style={styles.fieldSet}>
						<Text style={[styles.legend, styles.text]}>Phone Number *</Text>
						<TextInput
							style={[styles.TextInput, styles.text]}
							value={PhoneNumber}
							onChangeText={text => setPhoneNumber(text)}
						/>
					</View>

					<View style={styles.fieldSet}>
						<Text style={[styles.legend, styles.text]}>Email *</Text>
						<TextInput
							style={[styles.TextInput, styles.text]}
							value={email}
							onChangeText={text => setEmail(text)}
						/>
					</View>

					<View style={styles.fieldSet}>
						<Text style={[styles.legend, styles.text]}>Description *</Text>
						<TextInput
							style={[styles.TextInput, styles.text]}
							value={Description}
							onChangeText={text => setDescription(text)}
						/>
					</View>

					<TouchableOpacity onPress={() => { navigation.navigate('ViewHistory', { id: id }) }} >
						<TextInput
							// accessible={false}
							editable={false}
							style={[styles.TextInput, styles.text]}
							value="Rooms" // Use the actual rooms value here
						/>
					</TouchableOpacity>

					<View style={[styles.buttonView]}>
						<TouchableOpacity style={styles.button} onPress={delData}>
							<Text style={[styles.buttonText]}>Delete Hotel</Text>
						</TouchableOpacity>
					</View>

				</View>
			</ScrollView>
		</View>
	);
};

export default AllHotelDetails;

const styles = {
	imgStyle: {
		width: 306,
		height: 200,
		backgroundColor: "#fff",
		borderRadius: 2,
	},
	mainContainer: {
		marginBottom: 40,
		backgroundColor: "#fff",
	},
	container: {
		borderWidth: 1,
		margin: 10,
		borderRadius: 3,
		borderColor: "rgb(204, 204, 204)",
		backgroundColor: "rgb(245, 245, 245)",
		padding: 15,
		elevation: 3,
	},
	tetxStyle: {
		fontSize: 15,
		color: "#17baa1",
		margin: 5,
	},
	button: {
		width: 120,
		alignItems: 'center',
		paddingVertical: 12,
		borderRadius: 30,
		elevation: 3,
		backgroundColor: 'red',
		marginTop: 15,
	},
	buttonText: {
		fontSize: 16,
		letterSpacing: 1.25,
		color: '#fff',
	},
	buttonView: {
		alignSelf: 'center',
		marginTop: 10,
		padding: 10,
	},
	fieldSet: {
		borderBottomWidth: 1,
		borderColor: '#17baa1',
		maxWidth: '100%',
		height: 65,
		marginBottom: 10,
	},
	legend: {
		position: 'absolute',
		top: 10,
		left: 7,
		fontWeight: 'bold',
		fontSize: 14,
		color: '#17baa1',
	},
	TextInput: {
		width: '100%',
		height: 40,
		padding: 10,
		fontSize: 16,
	},
};
