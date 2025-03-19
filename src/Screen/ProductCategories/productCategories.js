import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductListCategories from '../../component/ProductListCategories';


export default function ProductCategories(props) {

	// state = {
	// 	loading: true,
	// 	data: []
	// }
	const [loading, setLoading] = React.useState(true)
	const [data, setData] = React.useState([])

	React.useEffect(() => {
		console.log(props)
		categoriesRetrieveHandler()
	}, [])



	const categoriesRetrieveHandler = async () => {
		let res = await axios.get("http://100.26.11.43/product/list/cat/")
		setData(res.data)
		setLoading(false)
	}


	// function categoriesMapHandler() {
	// 	return data.map((t, key) => {
	// 		return (<ProductListCategories navigation={props.navigation} data={t} key={key} />)
	// 	})
	// }



	return (
		<View style={styles.viewStyle}>
			<View style={{ flexDirection: "row", backgroundColor: "black", height: 50, padding: 10, alignItems: "center" }}>
				<MaterialCommunityIcons onPress={() => { props.navigation.goBack(null) }}
					color="#fff" name="arrow-left" size={25} />
			</View>
			<ScrollView>
				<View style={{ marginTop: 10, marginBottom: 10, backgroundColor: "#e0ffff", alignItems: "center", justifyContent: "center" }}>
					<Text style={{ color: "#17baa1", padding: 5, fontSize: 20 }}>SHOP BY CATEGORY</Text>
				</View>
				<View style={{ flexWrap: "wrap", flexDirection: "row", paddingHorizontal: 15, justifyContent: 'space-between', alignItems: "center", backgroundColor: "#eee" }}>
					{
						data.map((t, key) => {
							return (<ProductListCategories navigation={props.navigation} data={t} key={key} />)
						})
					}
				</View>
			</ScrollView>
		</View>




	)

}

const styles = {
	viewStyle: {
		flex: 1,

	}
}