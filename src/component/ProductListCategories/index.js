import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';


export default function ProductListCategories(props) {


	let data = props.data
	console.log(data.id, "test")
	return (

		<TouchableOpacity onPress={() => { props.navigation.navigate("categoryProducts", { id: data.id }) }}
			style={{ alignItems: "center", justifyContent: "center", margin: 5, backgroundColor: "#fff", borderRadius: 5, elevation: 3 }}>
			<Image source={{ uri: data.image }} style={styles.imgStyle} />
			<Text style={{ fontSize: 20 }}>{data.category_name}</Text>
		</TouchableOpacity>
	)

}

const styles = {
	imgStyle: {
		height: 200,
		width: 170
	}
}