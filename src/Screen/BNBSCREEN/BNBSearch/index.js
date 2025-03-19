import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('window');

const BNBSearch = ({ navigation }) => {

  const [search1, setsearch] = useState('')
  const [data, setdata] = useState('')

  useEffect(() => {
    // getdata();
    searchdata(search1);
    return () => { };
  }, [search1]);
  const searchdata = async(search1) => {
    const token = await AsyncStorage.getItem('token')
    
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
    };
    fetch('http://100.26.11.43/bnb/roomAPI/', requestOptions)
      .then(res => res.json())
      .then(resData => {
        setdata(resData);
        // alert(JSON.stringify(resData))


      })
      .catch(error => alert(error));
  };



  const getdata = async() => {
    const token = await AsyncStorage.getItem('token')
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
    };

    fetch('http://100.26.11.43/bnb/add/', requestOptions)
      .then(res => res.json())
      .then(resData => {
        setdata(resData);
        // alert(JSON.stringify(resData))


      })
      .catch(error => alert(error));
  };





  return (
    <View style={styles.container}>
      <View style={styles.tile}>
{/* 
        <TextInput placeholder='Search Location' style={{ paddingHorizontal: 20 }} onChangeText={(text) => setsearch(text)}>
        </TextInput> */}
      </View>


      <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('RoomPage', { room_id: item.id }) }}>
                        <View style={styles.image}>
                            <Image
                            resizeMode='contain'
                                source={{ uri: item.image }}
                                style={{  width: "100%", height:"100%" }}
                            >
                            </Image>
                        </View>
                        <View style={{ width:"60%", paddingHorizontal:"5%"}}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text style={styles.itemprice}>${item.price}</Text>
                            <Text style={styles.itemTitle}>Available : {item.available ? "Yes" : "No"}</Text>
                            {/* <TouchableOpacity onPress={() => functionDelete(item.id)} style={{ padding:5, backgroundColor:"red", width:80, justifyContent:"center", alignItems:"center", borderRadius:5, marginTop:5}}>
                            <Text style={{...styles.itemprice, color:"white"}}>Delete</Text>
                            </TouchableOpacity> */}
                        </View>
                    </TouchableOpacity>
                )}></FlatList>

    </View>
  );
}
export default BNBSearch;

const styles = {
  container: {
      // flex: 1,
      backgroundColor: '#f0f0f0',
      // alignItems: 'center',
      paddingTop: 20,
      height: '100%'
  },

  item: {
      backgroundColor: '#fff',
      marginHorizontal:"5%",
      color: '#fff',
      marginBottom: 10,
      borderRadius: 5,
      borderColor: 'grey',
      borderWidth: 0.5,
      flexDirection: 'row',
      width:"90%",
      height:150

  },

  image: {
      width: "40%",
      height:"100%",
      backgroundColor: '#a5a5a5',
  },
  itemText: {
      fontSize: 25,
      fontWeight: '700',
      // width: '90%',
      color: '#17baa1',
      marginTop: 25
  },

  itemTitle: {
      fontSize: 18,
      fontWeight: '400',
      // width: '90%',
      color: 'green',
      maxHeight: '35%'
  },

  itemprice: {
      fontSize: 15,
      fontWeight: '400',
      // width: '90%',
      color: 'orange',
  },

};