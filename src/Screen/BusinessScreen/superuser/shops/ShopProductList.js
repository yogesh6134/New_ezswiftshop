import React , {Component} from 'react';
import {View , Text , TouchableOpacity ,Image , ScrollView , ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
var image = require("../../assets/hiclipart.com(9).png")



export default class ShopProductList extends Component{

	state={
		shops:[],
		loading:true
	}


	async componentDidMount(){
		const { shopId } =  await this.props.navigation.state.params;
		this.setState({shopId : shopId})
		this.shopsListHandler()
		this.willFocusSubscription = this.props.navigation.addListener(
		      'willFocus',
		      () => {
		        this.shopsListHandler();
		      }
		    );
		  }

	  componentWillUnmount =()=> {
	    this.willFocusSubscription.remove();
	  }

	shopsListHandler = async() =>{
		console.log(this.state.shopId,"jkl")
		let res1 = await axios.get("http://100.26.11.43/product/shop_product/"+this.state.shopId.user)
		// let res 	=	await	axios.get("http://100.26.11.43/shops/list/")
		console.log(res1,"lkj")
		this.setState({shops:res1.data})
		this.setState({loading:false})
	}


	shopListMapHandller =()=>{
		return this.state.shops.map((i,key)=>{
			return (
				<TouchableOpacity key={key} onPress={()=>{this.props.navigation.navigate('shopproductdetail',{data:i})}}
					style={{backgroundColor:"#fff",padding:10, margin:10, width:"45%", alignItems:"center"}}>
					<View key2={key} style={{backgroundColor:"#fff",margin:5}}>
						<Image  style={{height:150,width:150}} source={{uri:i.product_image}} />
						{/* <Image  style={{height:100,width:100}} source={image} /> */}
					</View>
					<View key3={key} style={{marginLeft:10,justifyContent:"center",alignItems:"center"}}>
						<Text style={{fontSize:16,color:"orange"}}>{i.product_name}</Text>
					</View>
				</TouchableOpacity>
				)
		})
	}


	render(){
		if(this.state.loading){
			return(
					<View style={{flex:1,alignItems:"center",justifyContent:'center'}}>
						<View style={{borderRadius:5,backgroundColor:"#fff",padding:30}}>
							<ActivityIndicator size="large" color="#17baa1"/>
						</View>
					</View>
				)
		}
		else{
		return(
		<View style={{flex:1}}>
			<View style={{backgroundColor:"black",flexDirection:"row",alignItems:"center", justifyContent:"space-between"}}>
						<TouchableOpacity  onPress={()=>this.props.navigation.goBack(null)}>
							<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="arrow-left"/>
						</TouchableOpacity>
						<Text style={{fontSize:25,color:"#fff"}}>Products</Text>
						<TouchableOpacity  onPress={()=>this.props.navigation.navigate('shopaddproduct',{shopdata : this.state.shopId})}>
							<MaterialCommunityIcons style={{color:"white" ,padding:12}}  size={25} name="plus"/>
						</TouchableOpacity>
				</View>
		
			<ScrollView >
				<View style={{ flexWrap:"wrap", flexDirection:"row"}}>
				{this.shopListMapHandller()}
				</View>
			</ScrollView>

		</View>
			)
		}
	}
}