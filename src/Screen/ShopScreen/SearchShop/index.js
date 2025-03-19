import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import Icon from "react-native-vector-icons/Ionicons"
import SearchShopList from '../../../Component/SearchShopList';




export default function SearchShop(props) {

	const [input, setInput] = useState("")
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	const onChangeTextHandler = value => {
		setInput(value)
	}


	const onButtonPressHandler = async () => {
		// this.setState({ loading: true })
		setLoading(true)
		const requestOptions = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                //   Authorization: token,
            },
        };
		// alert(input)
		// var self =this;
		// axios.get("http://100.26.11.43/shops/?q="+this.state.input)
		// .then(function(response){
		// 	self.setState({data:response.data})
		// 	self.setState({loading:false})
		// })
		await fetch("http://100.26.11.43/shops/search/?q=" + input, requestOptions)
			.then(response => response.json())
			.then(data => {
				setData(data)
				// alert(JSON.stringify(data))
				setLoading(false)
			});
	}


	const mapProduct = () => {
		return data.map((t, key) => {
			return (<SearchShopList
				navigation={props.navigation}
				data={t} key={key} />)
		})
	}




	if (loading) {
		return (
			<View style={{ flex: 1 }}>
				<View style={styles.viewStyle}>
					<Icon name="arrow-back-outline" size={25} color="#eee"
						style={{ marginRight: 10 }}
						onPress={() => { props.navigation.goBack() }} />
					<View style={styles.viewStyle2}>
						<TextInput placeholder="search Shops "
							value={input}
							style={styles.inputStyle}
							onChangeText={onChangeTextHandler} />
						<Icon style={styles.buttonStyle}
							name="search"
							// style={{ color: "grey" }}
							size={25}
							onPress={onButtonPressHandler} />
					</View>
				</View>
				<View style={styles.activitycontainer}>
					<View style={styles.activityStyle}>
						<ActivityIndicator size="large" color="#17baa1" />
						<StatusBar barStyle="default" />
					</View>
				</View>
			</View>
		)
	}
	else {
		return (
			<View style={{ flex: 1 }}>
				<View style={styles.viewStyle}>
					<Icon name="arrow-back-outline" size={25} color="#eee"
						style={{ marginRight: 10 }}
						onPress={() => { props.navigation.goBack() }} />
					<View style={styles.viewStyle2}>
						<TextInput placeholder="Search Shops "
							value={input}
							style={styles.inputStyle}
							onChangeText={onChangeTextHandler} />
						<Icon style={styles.buttonStyle}
							name="search"
							// style={{ color: "grey" }}
							size={25}
							onPress={onButtonPressHandler} />
					</View>
				</View>
				<ScrollView>
					{mapProduct()}
				</ScrollView>
			</View>
		)
	}

}





const styles = {
	activityStyle: {
		padding: 30,
		// borderWidth:1,
		borderRadius: 5,
		backgroundColor: "#fff",
		borderColor: "#17baa1"

	},
	activitycontainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	viewStyle: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center'
	},
	viewStyle2: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		border: 2,
		borderRadius: 3,
		width: '90%'
	},
	inputStyle: {
		width: "85%",
		color: '#17baa1',
		fontSize: 18,
		padding: 0
		// marginLeft:20,
		// height: 25
	},
	buttonStyle: {
		width: "20%",
		color: '#fff',
		height: 25,
		color: "grey" 

	}
}