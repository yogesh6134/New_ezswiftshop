import React , {Component} from 'react';
import {View , Text , TouchableOpacity ,Button , ActivityIndicator,StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { TextField } from 'react-native-material-textfield';



export default class ProductContentList extends Component{

	deleteContent = async() =>{
		await axios.delete("http://100.26.11.43/product/contents/RUD/"+this.props.data.id)
		this.props.fun()
	}

	render(){
		var data  = this.props.data
		return(
					<View  style={styles.contentViewStyle}>
						<View style={{flex:1}}>
							<Text style={{fontSize:17,color:"#17baa1",fontStyle:"italic"}}>{data.content}</Text>
							<Text style={{color:"orange"}}>${data.content_price}</Text>
						</View>
						<Icon  onPress={this.deleteContent}
							name='ios-trash' color="red" size={30} />
					</View>
				)
	}
}


const styles = {
	contentViewStyle:{
			flexDirection:"row",
			margin:10,
			backgroundColor:"#ffffff",
			
			justifyContent:"space-between",
			alignItems:"center",
			padding:10,
			elevation:3
		},
}