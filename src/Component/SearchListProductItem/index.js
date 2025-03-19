import React from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet, } from 'react-native';
import { navigateTo } from '../../utils/navigateTo';

const SearchListProductItem = ({data , key}) => {
    return (
        <TouchableOpacity onPress={() => navigateTo('productdetail', { url: props.data.url })}>
            <View style={styles.viewStyle}>

                <View style={{ elevation: 3, backgroundColor: "#eee" }}>
                    <Image style={styles.imagStyle}
                        source={{ uri: props.data.product_image }} />
                </View>
                <View style={{ flex: 1, margin: 5, padding: 12 ,width:'30%'}}>
                    <Text style={styles.textStyle}>{data.product_name}</Text>
                    <Text style={styles.textStyle2}>${data.product_price}</Text>
                    <Text style={styles.textStyle3}>{data.shop_name.shop_name}</Text>
                </View>


            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    viewStyle:{
        backgroundColor:'#fff',
        flexDirection:"row",
        // justifyContent:"center",
        alignItems:"center",
        elevation: 3,
         margin:6,
       flex:1,
       // borderRadius:5,
       borderColor:"#17baa1",
       // borderWidth:5,
       padding:10,
       shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,

    },
    viewStyle2:{
        // alignItems:"center",
        // justifyContent:"center",
        backgroundColor:"#fff",
        flex:1,
        width:170,
        flexWrap:"wrap",
        borderRadius:10,
       borderColor:"red",
       borderWidth:2,
        // margin:10,
          // padding:10
          // flexDirection:"row"

    },
    imagStyle:{
        height:150,
        width:170,
        borderColor:"#eee",
        borderWidth:2,
    },
    textStyle:{
        color:'#17baa1',
        fontSize:20,
    },
    textStyle2:{
        color:'orange',
        fontSize:15,

    },
    textStyle3:{
        color:'#17baa1',
        

    }
})



export default SearchListProductItem;