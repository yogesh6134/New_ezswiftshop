import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Platform, TouchableOpacity, ActivityIndicator, StatusBar, NativeEventEmitter, NativeModules } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Speech from 'expo-speech';
// import Toast from 'react-native-simple-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import Tts from 'react-native-tts';
import ProductContentMap from '../../../Component/ProductContentMap';
import { COLORS } from '../../../utils/color';


const ProductContent = ({route, navigation}) => {

  // state variables
  const [loading, setLoading] = React.useState(true)
  const [selectedItems, setSelectedItems] = React.useState([])
  const [data, setData] = React.useState({})
  const [product_price, setProductPrice] = React.useState(null)
  const [shop_name, setShopName] = React.useState({})
  const [token, setToken] = React.useState('')
  const [data2, setData2] = React.useState([])
  const [data3, setData3] = React.useState([])
  const [options, setOptions] = React.useState([])
  const [total_tax, setTotalTax] = React.useState(0.00)
  const [url, setUrl] = React.useState("")
  const [quantity, setQuantity] = React.useState(1)
  const [price, setPrice] = React.useState(null)
  const [active, setActive] = React.useState(false)
  const [inFavourite, setInFavourite] = React.useState(false)
  const [product, setProduct] = React.useState(null)
  const [content, setContent] = React.useState([])

  const isFocused = useIsFocused();

  // useEffect
  useEffect(() => {
    getObject();
  },[isFocused])

  const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
	ee.addListener('tts-start', () => {});
	ee.addListener('tts-finish', () => {});
	ee.addListener('tts-cancel', () => {});

  // functions
  const taxCalculationHandler = () => {
    return data3.map((t, key) => {
      let tax = total_tax;
      // alert(total_tax)
      let tax_percentage = parseFloat(t.Tax_percentage / 100) + parseFloat(tax)
      setTotalTax(tax_percentage)
    })
  }

  const getObject = async () => {
    const { url } = route.params;
    setUrl(url)
    try {
    let res = await axios.get(url);
    // alert(JSON.stringify(res))
    // self.setState({ data: res.data, shop_name: res.data.shop_name })
    setData(res.data)
    setShopName(res.data.shop_name)
    setProduct(res.data.product_id)
    setProductPrice(res.data.product_price)
    let token = await AsyncStorage.getItem('token');
    setToken(token);
    // this.setState({loading:false})
    let res2 = await axios.get(res.data.content_category);
    setData2(res2.data)
    let res3 = await axios.get(res.data.taxes);
    setData3(res3.data)
    setLoading(false)
    taxCalculationHandler()}
    catch{
      error =>{
      alert(error);}
    }
  }

  const addTOCArtHandler = async () => {
    if (content.length >> 0) {
      const { url } = route.params;
      let tax_price = parseFloat(product_price) * parseFloat(total_tax)
      let final_price = parseFloat(product_price) + parseFloat(tax_price)
      setLoading(true)
      try{
      let res = await axios.post("http://100.26.11.43/cart/order_item/create/", {
        quantity: quantity,
        active: true,
        inFavourite: false,
        product: product,
        content: content,
        Product_price: product_price,
        Tax: parseFloat(Number(tax_price).toFixed(2)),
        price: parseFloat(Number(final_price).toFixed(2))
      },
        {
          headers: {
            Authorization: token
          }
        },
      )

      // setLoading(false)
    //   Toast.show("item added succesfully")
      Tts.speak("item added succesfully")
     navigation.navigate('index')}
      catch{
        error => alert(error)
      }
    }
    else {
    //   Toast.show("add items")
      Tts.speak("add items")

    }
  }

  const loadingFalseFun = () => (
    setLoading(false)
  )

  const onTapHandler = (data) => {
    if (content.includes(data.id)) {
      let item = content.indexOf(data.id)
      let arr = content
      arr.splice(item, 1)
      setContent(arr)
      let q_quantity  = quantity
      let price = data.content_price * q_quantity 
      let product_Price = parseFloat(product_price) - parseFloat(price)
      setProductPrice(parseFloat(Number(product_Price).toFixed(2)))

    } else {
      let arr = content
      arr.push(data.id)
      setContent(arr)
      let q_quantity  = quantity
      let price = data.content_price * q_quantity 
      let product_Price = parseFloat(product_price) + parseFloat(price)
      setProductPrice(parseFloat(Number(product_Price).toFixed(2)))
    }
  }

  const onTapHandler2 = (data, extra_price) => {
    if (content.includes(data.id)) {
      let item = content.indexOf(data.id)
      let arr = content
      arr.splice(item, 1)
      setContent(arr)
      let q_quantity = quantity
      let price = data.content_price * q_quantity 
      let product_Price = parseFloat(product_price) - parseFloat(price)
      setProductPrice(parseFloat(Number(product_Price).toFixed(2)))
    } else {
      let arr = content
      arr.push(data.id)
      setContent(arr)
      let q_quantity  = quantity
      let price = data.content_price * q_quantity 
      let product_Price = parseFloat(product_price) + parseFloat(price)
      setProductPrice(parseFloat(Number(product_Price).toFixed(2)))
    }
  }

  const onTapHandler3 = (data, extra_price) => {
    if (content.includes(data.id)) {
      let item = content.indexOf(data.id)
      let arr = content
      arr.splice(item, 1)
      setContent(arr)

    } else {
      let arr = content
      arr.push(data.id)
      setContent(arr)

    }
  }

  const contentMapHandler = () => {
    return pass
  }

  const quantityIncreaseHandler = async () => {
    setLoading(true)
    console.log(typeof(product_price))
    let price = parseInt(product_price) / quantity
    let q_quantity = quantity + 1
    let product_Price = price * q_quantity
    setQuantity(q_quantity)
    setProductPrice(product_Price)
    setLoading(false)
  }



  const quantitydecreaseHandler = async () => {
    if (quantity >> 1) {
      setLoading(true)
      let price = parseInt(product_price) / quantity
      let q_quantity = quantity - 1
      let product_Price = price * q_quantity
      setQuantity(q_quantity)
      setProductPrice(product_Price)
      setLoading(false)
    } else {
    }
  }


  // component rendering
  // render(){
    if (loading) {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <Icon style={{ color: "white", padding: 12 }}
              size={25} name="arrow-back-outline"
              onPress={() => { navigation.goBack() }} />
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
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
          <View style={styles.container}>
            <Icon style={{ color: COLORS.black, padding: 12 }}
              size={25} name="arrow-back-outline"
              onPress={() => { navigation.goBack() }} />
          </View>
          <ScrollView>
            {data2.map((t, key) => {
      return (
        <ProductContentMap
          setLoad={loadingFalseFun}
          data={t}
          key={key}
          item={content}
          radFun={onTapHandler}
          radFun2={onTapHandler2}
          radFun3={onTapHandler3}
        />
      )
    })}
          </ScrollView>
          <View style={styles.buttonStyle} >

            <View style={{ backgroundColor: "#fff", flexDirection: "row", borderColor: "grey", borderRadius: 5, borderWidth: 1, alignItems: "center", elevation: 2, height: 40, }}>
              <View>
                <MaterialCommunityIcons style={{}}
                  name="minus" size={33} onPress={quantitydecreaseHandler} color="orange" />
              </View>
              <View style={{ backgroundColor: "#17baa1", width: 50, elevation: 3 }}>
                <Text style={{ color: "#fff", alignSelf: "center", fontSize: 29 }}>{quantity}</Text>
              </View>
              <View>
                <MaterialCommunityIcons name="plus" size={33} onPress={quantityIncreaseHandler} color="orange" />
              </View>
            </View>

            <TouchableOpacity onPress={addTOCArtHandler}
              style={{ elevation: 3, backgroundColor: "#17baa1", height: 40, width: 150, borderRadius: 5, borderColor: "grey", borderWidth: 1, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 20, color: "#fff" }}>
                ADD ${product_price}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  // }
};

const styles = {
  container: {
    width: "100%",
    flexDirection: "row",
  },
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
  buttonStyle: {
    flexDirection: "row",
    // backgroundColor:"#17baa1",
    // width:"50%",
    // alignSelf:"center",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    // borderRadius:400/2,
    padding: 10,
    marginBottom: 10,
    margin: 10

  }
}

export default ProductContent;
