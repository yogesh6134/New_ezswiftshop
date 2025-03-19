import React from 'react';
import {Text , View ,Image} from 'react-native';
import { IMAGES } from '../../../assets';
import AppHeader from '../products/header';


export default class Home extends React.Component{



	render(){
		return(
			<View style={{flex:1}}>
				<AppHeader navigation={this.props.navigation}  />
				<View  style={{flex:1,alignItems:'center',justifyContent:'center'}}>
					<Image style={{height:350,width:350}} source={IMAGES.hiclipart6}/>
					
				</View>
			</View>

			)
	}
}