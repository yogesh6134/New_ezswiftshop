import React from 'react';
import {View,Text , TouchableOpacity ,StyleSheet , Button , ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class OrderHeader extends React.Component{

	refreshfun = () => {
		this.props.Fun()
	}

	render(){
		return(
			<View style={styles.headerStyle}>
    
                         <MaterialCommunityIcons style={{color:"white",padding:12}}  
                         			size={30}name="menu" 
                         			onPress={()=>{this.props.navigation.toggleDrawer()}}/>
                       <Image style={{width:250,height:60}} resizeMode={"contain"} source={require('../assets/EZ-Swift-type-logo_BUSINESS.png') } />                     
                         <TouchableOpacity  onPress={this.props.Fun}>
                         	<MaterialCommunityIcons style={{color:"white",padding:12}}  size={30}name="reload"/>
                         </TouchableOpacity>
                       
                
                </View>
			)
	}
}

const styles = StyleSheet.create({
	headerStyle:{
		flexDirection:'row',
		backgroundColor:'black',
            justifyContent:"space-between"
		
      
		},
      viewStyle:{

      	backgroundColor:'orange',
      }




})