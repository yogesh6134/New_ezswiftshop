import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Modal, TouchableHighlight, TouchableOpacity, ActivityIndicator, ScrollView, Image, ImageBackground, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
// import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextField } from 'react-native-material-textfield';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import CheckBox from '@react-native-community/checkbox';
// import CheckBox from 'expo-checkbox';



// import MapView from 'react-native-maps';
// import * as Location from 'expo-location';
// import * as Permissions from "expo-permissions";
// import { googleGeocodeAsync } from 'expo-location/build/LocationGoogleGeocoding';
// import { getDistance } from 'geolib';
import Slider from '@react-native-community/slider';

// import Slider from 'rn-range-slider';
// import Rail from './slider/Rail';
// import RailSelected from './slider/RailSelected';
// import Thumb from './slider/Thumb';
// import Notch from './slider/Notch';
// import Label from './slider/Label';
// import RangeSlider from 'react-native-range-slider-expo';



const LOCATION_TASK_NAME = "background-location-task";



export default class ShopDetail extends React.Component {



	state = {
		"shop_name": "",
		"address_line_1": "",
		"address_line_2": "",
		"town_city": "",
		"country": "",
		"shop_image": null,
		"contact": "",
		"email_address": "",
		"timming": "",
		"shop_details": "",
		"active": true,
		"appointment": false,
		"delivery_charges": "",
		"edit": "",
		"token": "",
		"personal_pickup_limit": "",
		"loading": true,
		"longitude": "76.7835029",
		"latitude": "30.6947816",
		"slot_duration_in_mins": "",
		"appointments_in_one_slot": "",
		"total_slot_in_day": "",
		shopdata: {},
		modalVisible: false,
		modalVisible2: false,
		modalVisible3: false,
		slidervalue: 0,
		fromvalue: 0,
		tovalue: 0,
		value: 0,
		rangePrice: 0.00,

		marker: null,
		location: [],
		region: null,
		coordinates: null,
		error: "",
		mapOpen: false,
		distance: 0,
		priceRangedata: [],
		priceRangeIter: 0,
		shopId: null,
		arr : [
			{
				name : "Mon",
				Weeklyoff : false
			},
			{
				name : "Tue",
				Weeklyoff : false
			},
			{
				name : "Wed",
				Weeklyoff : false
			},
			{
				name : "Thu",
				Weeklyoff : false
			},
			{
				name : "Fri",
				Weeklyoff : false
			},
			{
				name : "Sat",
				Weeklyoff : false
			},
			{
				name : "Sun",
				Weeklyoff : false
			},
		],
		arr_d : [
			{
				name : "Mon",
				Weeklyoff : false
			},
			{
				name : "Tue",
				Weeklyoff : false
			},
			{
				name : "Wed",
				Weeklyoff : false
			},
			{
				name : "Thu",
				Weeklyoff : false
			},
			{
				name : "Fri",
				Weeklyoff : false
			},
			{
				name : "Sat",
				Weeklyoff : false
			},
			{
				name : "Sun",
				Weeklyoff : false
			},
		]

	}

	// 	const renderThumb = useCallback(() => <Thumb/>, []);
	// const renderRail = useCallback(() => <Rail/>, []);
	// const renderRailSelected = useCallback(() => <RailSelected/>, []);
	// const renderLabel = useCallback(value => <Label text={value}/>, []);
	// const renderNotch = useCallback(() => <Notch/>, []);
	// const handleValueChange = useCallback((low, high) => {
	//   setLow(low);
	//   setHigh(high);
	// }, []);

	// _getLocationAsync = async () => {
	// 	let { status } = await Location.requestForegroundPermissionsAsync();
	// 	console.log("hiiiii", status)
	// 	if (status == 'granted') {
	// 		let location = await Location.getCurrentPositionAsync({});

	// 		// await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
	// 		//   enableHighAccuracy: true,
	// 		//   distanceInterval: 1,
	// 		//   timeInterval: 5000
	// 		// });
	// 		// // watchPositionAsync Return Lat & Long on Position Change
	// 		// this.location = await Location.watchPositionAsync(
	// 		//   {
	// 		//     enableHighAccuracy: true,
	// 		//     distanceInterval: 1,
	// 		//     timeInterval: 10000
	// 		//   },
	// 		//   newLocation => {
	// 		// let { loc } = location;
	// 		console.log(location);
	// 		let region = {
	// 			latitude: location.coords.latitude,
	// 			longitude: location.coords.longitude,
	// 			latitudeDelta: 0.0025,
	// 			longitudeDelta: 0.0025
	// 		};
	// 		let coordinates = {
	// 			latitude: location.coords.latitude,
	// 			longitude: location.coords.longitude
	// 		}
	// 		this.setState({ coordinates: coordinates })
	// 		this.setState({ marker: coordinates })
	// 		this.setState({ region: region });

	// 		//     console.log(this.state.region)
	// 		//   },
	// 		//   error => console.log(error)
	// 		// );
	// 		// return this.location;
	// 	}
	// };

	async componentDidMount() {
		await this.apiCallHandler()
		this.getPriceRangeHandler();
		// this.getPermissionAsync();
		// this._getLocationAsync();
		this.getAppointment();

	}

	// getPermissionAsync = async () => {
	// 	if (Constants.platform.ios) {
	// 		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
	// 		if (status !== 'granted') {
	// 			alert('Sorry, we need camera roll permissions to make this work!');
	// 		}
	// 	}
	// 	const token = await AsyncStorage.getItem('token');
	// 	this.setState({ token: token })
	// };


	_pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				// allowsEditing: true,
				// aspect: [4, 3],
				// quality: 1,
			});
			if (!result.cancelled) {
				this.setState({ shop_image: result.uri });
			}
		} catch (E) {
			console.log(E);
		}
	};


	//   <Text style={{fontSize:30,fontWeight:'bold',marginLeft:'50%',marginVertical:5}}>{this.state.slidervalue}</Text>

	//             <RangeSlider min={0} max={25}
	//                  fromValueOnChange={(value) => this.setState({fromvalue:value})}
	//                  toValueOnChange={(value) => this.setState({tovalue:value})}
	//                  initialFromValue={this.state.fromvalue}
	//             />
	async apiCallHandler() {
		const token = await AsyncStorage.getItem('token');
		const { data } = this.props.navigation.state.params;
		console.log(data, "jkl")
		this.setState({ shopdata: data, shopId: data.id, user: data.user })
		this.setState({ shop_name: data.shop_name })
		this.setState({ address_line_1: data.address_line_1 })
		this.setState({ address_line_2: data.address_line_2 })
		this.setState({ town_city: data.town_city })
		this.setState({ country: data.country })
		this.setState({ shop_image: data.shop_image })
		this.setState({ contact: data.contact })
		this.setState({ email_address: data.email_address })
		this.setState({ timming: data.timming })
		this.setState({ shop_details: data.shop_details })
		this.setState({ delivery_charges: data.delivery_charges })
		this.setState({ personal_pickup_limit: data.personal_pickup_limit })
		this.setState({ active: data.active })
		this.setState({ appointment: data.is_appointment })
		this.setState({ edit: data.edit })
		this.setState({ token: token })
		this.setState({ loading: false })
		this.setState({ latitude: data.latitude })
		// console.log(this.state.latitude)
		this.setState({ longitude: (data.longitude).toString() })
		// console.log(this.state.longitude)

		// console.log("data",data)

	}

	profileEditHandler = async () => {
		this.setState({ loading: true })
		var self = this;
		let image_name = this.state.shop_image.split('/').pop();
		let photo = {
			uri: this.state.shop_image,
			name: image_name,
			type: 'image/jpg'
		};
		const token = await AsyncStorage.getItem('token');
		console.log(token)

		let newData = new FormData()
		newData.append("shop_image", photo)
		newData.append("shop_name", this.state.shop_name)
		newData.append("address_line_1", this.state.address_line_1)
		newData.append("address_line_2", this.state.address_line_2)
		newData.append("town_city", this.state.town_city)
		newData.append("country", this.state.country)
		newData.append("contact", this.state.contact)
		newData.append("email_address", this.state.email_address)
		newData.append("timming", this.state.timming)
		newData.append("delivery_charges", this.state.delivery_charges)
		newData.append("shop_details", this.state.shop_details)
		newData.append("personal_pickup_limit", this.state.personal_pickup_limit)
		newData.append("active", this.state.active)
		newData.append("is_appointment", this.state.appointment)
		newData.append("longitude", this.state.marker.longitude)


		newData.append("latitude", this.state.marker.latitude)

		console.log("New data", newData)
		const url = this.state.edit
		console.log('url', url)
		let response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
				Authorization: token,

			},
			body: newData
		});
		this.props.navigation.navigate('shops')
		this.setState({ loading: false })
		console.log(response.status)
	};

	deleteShopHandler = async () => {
		this.setState({ loading: true })
		await axios.delete(this.state.edit)
		this.props.navigation.navigate('shops')
		this.setState({ loading: false })

	}
	enableScroll = () => this.setState({ scrollEnabled: true });
	disableScroll = () => this.setState({ scrollEnabled: false });
	async getPriceRangeHandler() {
		console.log(this.state.shopId, "hiiii")
		await axios.get(`http://100.26.11.43/shops/pricerange/` + this.state.shopId)
			.then(res => {
				this.setState({ priceRangedata: res.data })
				console.log(res.data)
			})
			.catch(err => { console.log(err) })

	}
	async getAppointment() {
		console.log(this.state.shop_name, "hoga")
		await axios.get(`http://100.26.11.43/shops/appointmentduration/` + this.state.shop_name + '/')
			.then(res => {
				console.log(res.data[0],"lol")
				if (res.data[0].appointments_in_one_slot) {
					this.setState({
						appointments_in_one_slot: res.data[0].appointments_in_one_slot
						, slot_duration_in_mins: res.data[0].slot_duration_in_mins,
						total_slot_in_day: res.data[0].total_slot_in_day,
						arr : JSON.parse(res.data[0].weekoff)
					})
					console.log(res.data, "vinni")
				}
			})
			.catch(err => { console.log(err) })

	}
	async createAppointment() {
		await axios.post(`http://100.26.11.43/shops/appointmentduration/`,{

				"slot_duration_in_mins": this.state.slot_duration_in_mins,
				"appointments_in_one_slot": this.state.appointments_in_one_slot,
				"total_slot_in_day": this.state.total_slot_in_day,
				"weekoff": JSON.stringify(this.state.arr),
				"shop": this.state.shopId
			
		})
			.then(res => {
				
					console.log(res.data, "vinni")
				
			})
			.catch(err => { console.log(err) })

	}
	async deleteAppointment() {
		console.log(this.state.shop_name, "hoga")
		await axios.delete(`http://100.26.11.43/shops/appointmentduration/` + this.state.shop_name + '/')
			.then(res => {
				this.setState({
					appointments_in_one_slot: ""
					, slot_duration_in_mins: "",
					total_slot_in_day: "",
					arr : this.state.arr_d
				})
					console.log(res.data, "vinni")
			})
			.catch(err => { console.log(err) })

	}

	async rangePriceHandler() {
		const token = await AsyncStorage.getItem('token');
		console.log(token)
		let rangedata = {
			"start": this.state.fromvalue,
			"end": this.state.tovalue,
			"price": this.state.rangePrice,
			"shop": this.state.shopId
		}
		let response = await fetch('http://100.26.11.43/shops/pricerange/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: token,

			},

			body: JSON.stringify(rangedata)

		});
		console.log(response.data)
		console.log(rangedata)

	}

	setWeeklyoff(key){
		this.state.arr[key].Weeklyoff = this.state.arr[key].Weeklyoff ? false : true
		this.setState({arr : this.state.arr})
		console.log(this.state.arr)
	}

	render() {
		if (this.state.loading) {
			return (
				<View style={{ flex: 1 }}>
					<View style={{ backgroundColor: "black", justifyContent: "space-between", flexDirection: "row" }}>

						<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<Icon style={{ color: "white", padding: 12 }} size={25} name="arrow-back-outline" />
						</TouchableOpacity>
					</View>
					<View style={{ flex: 1, alignItems: "center", justifyContent: 'center', padding: 30, borderRadius: 5, backgroundColor: "#fff" }}>
						<ActivityIndicator size="large" color="#17baa1" />
					</View>
				</View>
			)

		} else {
			return (
				<View style={{ flex: 1 }}>
					<View style={{ backgroundColor: "black", justifyContent: "space-between", flexDirection: "row" }}>

						<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<Icon style={{ color: "white", padding: 12 }} size={25} name="arrow-back-outline" />
						</TouchableOpacity>
						<TouchableOpacity onPress={this.profileEditHandler}>
							<MaterialCommunityIcons style={{ color: "white", padding: 12 }} size={25} name="check" />
						</TouchableOpacity>
					</View>
					<ScrollView>
						<View style={styles.container}>
							<TouchableOpacity style={{}} onPress={this._pickImage}>
								<ImageBackground style={styles.imgStyle} source={{ uri: this.state.shop_image }}>
									<MaterialCommunityIcons name="pencil" color="black" style={{ alignItems: "flex-end" }} size={35} />
								</ImageBackground>
							</TouchableOpacity>

							<View style={{ alignItems: "center", flexDirection: "row", marginLeft: 10 }}>
								{/* <RadioButton
									size={35}
									status={this.state.active ? 'checked' : 'unchecked'}
									onPress={() => {
										if (this.state.active === true) {
											this.setState({ active: false })
										} else {
											this.setState({ active: true })
										}
									}}
								/> */}
								<Text style={{ fontSize: 20, color: "orange" }}> Active </Text>
							</View>
							<View style={{ alignItems: "center", flexDirection: "row", marginLeft: 10 }}>
								{/* <RadioButton
									size={35}
									status={this.state.appointment ? 'checked' : 'unchecked'}
									onPress={() => {
										if (this.state.appointment === true) {
											this.setState({ appointment: false })
										} else {
											this.setState({ appointment: true })
										}
									}}
								/> */}
								<Text style={{ fontSize: 20, color: "orange" }}> Appointment </Text>
							</View>

							<View style={styles.viewStyle}>
								<TextField
									labelFontSize={15}
									tintColor="orange"
									baseColor="#17baa1"
									label="Shop name"
									value={this.state.shop_name}
									onChangeText={(value) => { this.setState({ shop_name: value }) }} />
							</View>
							<View style={styles.viewStyle}>

								<TextField
									labelFontSize={15}
									tintColor="orange"
									baseColor="#17baa1"
									label="Address line 1"
									value={this.state.address_line_1}
									onChangeText={(value) => { this.setState({ address_line_1: value }) }} />

							</View>
							<View style={styles.viewStyle}>
								<TextField
									labelFontSize={15}
									tintColor="orange"
									baseColor="#17baa1"
									label="Address line 2"
									value={this.state.address_line_2}
									onChangeText={(value) => { this.setState({ address_line_2: value }) }} />
							</View>
							<View style={styles.viewStyle}>
								<TextField
									labelFontSize={15}
									tintColor="orange"
									baseColor="#17baa1"
									label="City"
									value={this.state.town_city}
									onChangeText={(value) => { this.setState({ town_city: value }) }} />
							</View>
							<View style={styles.viewStyle}>
								<TextField
									labelFontSize={15}
									tintColor="orange"
									baseColor="#17baa1"
									label="Country"
									value={this.state.country}
									onChangeText={(value) => { this.setState({ country: value }) }} />
							</View>
							<View style={styles.viewStyle}>
								<TextField
									labelFontSize={15}
									tintColor="orange"
									baseColor="#17baa1"
									label="Contact"
									value={this.state.contact}
									onChangeText={(value) => { this.setState({ contact: value }) }} />
							</View>
							<View style={styles.viewStyle}>
								<TextField
									labelFontSize={15}
									tintColor="orange"
									baseColor="#17baa1"
									label="Email"
									value={this.state.email_address}
									onChangeText={(value) => { this.setState({ email_address: value }) }} />
							</View>
							<View style={styles.viewStyle}>
								<TextField
									labelFontSize={15}
									tintColor="orange"
									baseColor="#17baa1"
									label="Shop Timming"
									value={this.state.timming}
									onChangeText={(value) => { this.setState({ timming: value }) }} />
							</View>
							<View style={styles.viewStyle}>
								<TouchableOpacity onPress={() => {
									this.setState({ modalVisible2: true })
									3
								}} >
									<TextField
										disabled
										labelFontSize={15}
										tintColor="orange"
										baseColor="#17baa1"
										label="Delivery Charges"
										value={""}
									/>
								</TouchableOpacity>
							</View>
							{this.state.appointment ? <View style={styles.viewStyle}>
								<TouchableOpacity onPress={() => {
									this.setState({ modalVisible3: true })
									3
								}} >
									<TextField
										disabled
										labelFontSize={15}
										tintColor="orange"
										baseColor="#17baa1"
										label="Appointments"
										value={""}
									/>
								</TouchableOpacity>
							</View> : null}
							<View style={styles.viewStyle}>
								<TouchableOpacity onPress={() => {
									this.props.navigation.navigate("shopproductlist", { shopId: this.state.shopdata })
								}} >
									<TextField
										disabled
										labelFontSize={15}
										tintColor="orange"
										baseColor="#17baa1"
										label="Products"
										value={""}
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.viewStyle}>
								<TextField
									labelFontSize={15}
									tintColor="orange"
									baseColor="#17baa1"
									label="Shop Detail"
									value={this.state.shop_details}
									onChangeText={(value) => { this.setState({ shop_details: value }) }} />
							</View>
							<View style={styles.viewStyle}>
								<TextField
									labelFontSize={15}
									tintColor="orange"
									baseColor="#17baa1"
									label="Physical Shopping Limit"
									value={this.state.personal_pickup_limit}
									onChangeText={(value) => { this.setState({ personal_pickup_limit: value }) }} />
							</View>

						</View>
						<View style={styl.centeredView}>
							<Modal
								animationType="slide"
								transparent={true}
								visible={this.state.modalVisible3}
								onRequestClose={() => {
									Alert.alert('Modal has been closed.');
								}}>
								<View style={styl.centeredView}>

									<View style={styl.modalView}>
										<View style={{ margin: 10 }}>
											<TextField
												labelFontSize={15}
												tintColor="orange"
												baseColor="#17baa1"
												label="Total Slots in a day"
												value={this.state.total_slot_in_day}
												onChangeText={(value) => { this.setState({ total_slot_in_day: value }) }} />
										</View>
										<View style={{ margin: 10 }}>
											<TextField
												labelFontSize={15}
												tintColor="orange"
												baseColor="#17baa1"
												label="Slot Duration (Min.)"
												value={this.state.slot_duration_in_mins}
												onChangeText={(value) => { this.setState({ slot_duration_in_mins: value }) }} />
										</View>
										<View style={{ margin: 10 }}>
											<TextField
												labelFontSize={15}
												tintColor="orange"
												baseColor="#17baa1"
												label="Appointments in One slot"
												value={this.state.appointments_in_one_slot}
												onChangeText={(value) => { this.setState({ appointments_in_one_slot: value }) }} />
										</View>
										<Text style={{fontSize:15, color:"#17baa1"}}> Weekly off </Text>
										<View style={{ margin: 10, flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between" }}>
										{ this.state.arr.map((item, key) =>	<View>
												<Text> {item.name} </Text>
											{/* <CheckBox
												disabled={false}
												value={item.Weeklyoff}
												onValueChange={() => this.setWeeklyoff(key)}
											/> */}
											</View>
										)}
										</View>
										<TouchableHighlight
											style={{ ...styl.openButton, backgroundColor: '#2196F3', marginTop: 10 }}
											onPress={() => {
												this.createAppointment()
												this.setState({ modalVisible3: false });


											}}>
											<Text style={styl.textStyle}>Create</Text>
										</TouchableHighlight>
										<TouchableHighlight
											style={{ ...styl.openButton, backgroundColor: 'red', marginTop: 10 }}
											onPress={() => {
												this.deleteAppointment()
												this.setState({ modalVisible3: false })

											}}>
											<Text style={styl.textStyle}>Delete</Text>
										</TouchableHighlight>
										<TouchableHighlight
											style={{ ...styl.openButton, backgroundColor: 'orange', marginTop: 10 }}
											onPress={() => {
												this.setState({ modalVisible3: false });

											}}>
											<Text style={styl.textStyle}>Exit</Text>
										</TouchableHighlight>
									</View>
								</View>
							</Modal>
						</View>
						<View style={styl.centeredView}>
							<Modal
								animationType="slide"
								transparent={true}
								visible={this.state.modalVisible2}
								onRequestClose={() => {
									Alert.alert('Modal has been closed.');
								}}>
								<View style={styl.centeredView}>

									<View style={styl.modalView}>

										<Text style={{ fontWeight: 'bold', marginLeft: '30%', marginBottom: 5 }}>set start range</Text>
										<Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: '40%', marginVertical: 5 }}>{this.state.fromvalue} - {this.state.tovalue}</Text>

										<Slider
											style={{ width: '100%', height: '10%', fontWeight: 'bold' }}
											minimumValue={0}
											maximumValue={100}
											step={1}
											minimumTrackTintColor="red"
											maximumTrackTintColor="grey"
											onValueChange={(value => {
												this.setState({ fromvalue: value })
												this.setState({ tovalue: value })
											})}

										/>

										<Slider
											style={{ width: '100%', height: '10%', fontWeight: 'bold' }}
											minimumValue={this.state.fromvalue}
											maximumValue={100}
											step={1}
											minimumTrackTintColor="red"
											maximumTrackTintColor="grey"
											onValueChange={(value => { this.setState({ tovalue: value }) })}

										/>

										{

											this.state.priceRangedata.map((item, index) => {

												if (index < 5) {
													return (

														<View key={item.id} style={{ marginHorizontal: 10, padding: 5 }}>

															<Text style={{ fontWeight: 'bold', fontSize: 20, }}>{item.start}-{item.end} MILES: ${item.price}</Text>


														</View>
													)
												}


											})
										}



										{
											this.state.priceRangedata.length < 5 ? (
												<>
													<View style={{ width: '100%', marginBottom: 20 }}>
														<TextField
															labelFontSize={15}
															tintColor="orange"
															baseColor="#17baa1"
															label="Price"
															value={(this.state.rangePrice).toString()}
															onChangeText={(value) => { this.setState({ rangePrice: value }) }} />
													</View>

													<TouchableHighlight
														style={{ ...styl.openButton, backgroundColor: 'tomato', marginBottom: 4 }}
														onPress={() => {

															this.rangePriceHandler()

														}}>
														<Text style={styl.textStyle}>Add</Text>
													</TouchableHighlight>
												</>
											) :
												(<Text></Text>)

										}


										<TouchableHighlight
											style={{ ...styl.openButton, backgroundColor: '#2196F3' }}
											onPress={() => {
												this.setState({ modalVisible2: false });


											}}>
											<Text style={styl.textStyle}>Done</Text>
										</TouchableHighlight>
									</View>
								</View>
							</Modal>
						</View>
						<View style={styl.centeredView}>
							<Modal
								animationType="slide"
								transparent={true}
								visible={this.state.modalVisible}
								onRequestClose={() => {
									Alert.alert('Modal has been closed.');
								}}>
								<View style={styl.centeredView}>

									<View style={styl.modalView}>
										<Text style={{ fontWeight: 'bold', marginLeft: '30%', marginBottom: 5 }}>Tap or Drag to set marker</Text>
										{/* <MapView
											initialRegion={this.state.region}
											showsCompass={true}
											showsUserLocation={true}
											rotateEnabled={true}
											ref={map => {
												this.map = map;
											}}
											style={styl.map}
											onPress={(e) => this.setState({ marker: e.nativeEvent.coordinate })}>
											{
												this.state.marker &&
												<MapView.Marker coordinate={this.state.marker}
													title={"Pinned Location"}
													draggable
													onDragEnd={(e) => {
														//   console.log(e.nativeEvent.coordinate)
														this.setState({ marker: e.nativeEvent.coordinate })
														this.setState({ longitude: e.nativeEvent.coordinate.longitude })

														this.setState({ latitude: e.nativeEvent.coordinate.latitude })

														//   console.log(this.state.marker)
													}}
												>
													<Image source={require('../../assets/pin.png')} resizeMode={"contain"} style={{ width: 13, height: 35 }} />


												</MapView.Marker>
											}



										</MapView> */}

										<TouchableHighlight
											style={{ ...styl.openButton, backgroundColor: '#2196F3' }}
											onPress={() => {
												this.setState({ modalVisible: false })
												//   this.CalculateDistance()
											}}>
											<Text style={styl.textStyle}>Done</Text>
										</TouchableHighlight>
									</View>
								</View>
							</Modal>

							<TouchableHighlight
								style={{ ...styl.openButton, backgroundColor: 'mediumseagreen' }}
								onPress={() => {
									this.setState({ modalVisible: true })
									this.setState({ mapOpen: true })
								}}>
								<Text style={{ ...styl.textStyle }}>Pin Your Location On Map</Text>
							</TouchableHighlight>
						</View>
						<TouchableOpacity onPress={this.deleteShopHandler}
							style={{ padding: 10, margin: 10, backgroundColor: "red", height: 40, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
							<MaterialCommunityIcons name="delete" size={25} color="#fff" />
							<Text style={{ color: "#fff", fontSize: 20 }}>DELETE SHOP</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			)
		}
	}


}


const styles = {
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
		// borderWidth:2,
		// borderColor:"#eee",
		margin: 10,
		backgroundColor: "#eee"
	},
	imgStyle: {
		height: 300,
		width: 330,
		borderWidth: 1,
		borderRadius: 3,
		borderColor: "rgb(204, 204, 204)",
	},
	viewStyle: {
		backgroundColor: "#eee",
		// borderWidth:2,
		// borderRadius:5,
		// borderColor:"orange",
		width: "100%",
		margin: 10
	}
}
const styl = StyleSheet.create({
	centeredView: {
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		width: '90%',
		height: '90%',
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 5,
		// alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	openButton: {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginHorizontal: 10

	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		// marginBottom: 15,
		textAlign: 'center',
		backgroundColor: 'red'
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		width: '80%',
		height: '100%'
	},
	map: {

		// width: (Dimensions.get('window').width)-100,
		// height: (Dimensions.get('window').height)-100,
		// marginBottom:5,
		width: '100%',
		height: '90%',
		marginBottom: 5

	}
});