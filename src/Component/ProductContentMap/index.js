import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StatusBar, NativeEventEmitter, NativeModules } from 'react-native';
// import { RadioButton } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Checkbox } from 'react-native-paper';
import axios from 'axios';
// import Toast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';
import Tts from 'react-native-tts';
// import * as Speech from 'expo-speech';

const ProductContentMap = (props) => {

    // state variables
    const [data, setData] = React.useState([])
    const [contents, setContents] = React.useState(props.data.content)
    const [content, setContent] = React.useState([])
    const [required, setRequired] = React.useState(props.data.required)
    const [loading, setLoading] = React.useState(true)
    const [token, setToken] = React.useState("")

    const isFocused = useIsFocused()

    // useEffect
    useEffect(() => {
        getObject();
    })

    const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
	ee.addListener('tts-start', () => {});
	ee.addListener('tts-finish', () => {});
	ee.addListener('tts-cancel', () => {});

    // functions
    const getObject = async () => {
        const data1 = props.data;
        let res = await axios.get(data1.content);
        // let token = await AsyncStorage.getItem('token');
        setToken(token);
        setData(res.data);
        const data = res.data[0];
        // addContentHandler(data)
        // addContentHandler1(data)
        // await setState({loading:false})
        props.setLoad()
    }

    const addContentHandler = (data) => {
        if ((content.length < props.data.requried && content.includes(data) == false) || (props.data.requried == null && content.includes(data) == false)) {
            let arr = content;
            arr.push(data)
            setContent(arr)
            if (props.data.requried) {
                let extra_price = 0.00;
                props.radFun3(data, extra_price)
                console.warn("---2")
            } else {
                props.radFun(data)
                // console.warn("---3")
            }
        } else if (props.data.requried && content.length > props.data.requried && content.includes(data)) {
            var item = content.indexOf(data)
            var arr = content
            var extra_price = props.data.required_content_price
            arr.splice(item, 1)
            setContent(arr)
            props.radFun2(data, extra_price)
            // console.warn("---4")
        } else if (content.includes(data)) {
            var item = content.indexOf(data)
            var arr = content
            arr.splice(item, 1)
            setContent(arr)
            if (props.data.requried) {
                var extra_price = 0.00;
                props.radFun3(data, extra_price)
                // console.warn("---6")
            } else {
                props.radFun(data)
                // console.warn("---7")
            }
        } else {
            // Toast.show("You can choose up to " + props.data.requried + " options")
            Tts.speak("You can choose up to " + props.data.requried + " options")

        }

    }

    const addContentHandler1 = async (data) => {
        if (content.length < props.data.requried) {
            var arr = content
            arr.push(data)
            setContent(arr)
            await props.radFun(data)
        }
        else if (content.includes(data) == false) {
            var arr = content
            arr.push(data)
            console.log(data)
            setContent(arr)
            await props.radFun(data)
            var data = content.shift()
            console.log(data)
            await props.radFun(data)

        }
        else {

        }
    }

    const contentsMapHandler = () => {
        if (props.data.requried == 1) {
            return data.map((data, key) => (
                <TouchableOpacity key={key} style={{ flex: 1, alignItems: "center", flexDirection: "row", marginLeft: 5 }}
                    onPress={() => addContentHandler1(data)}>
                    {/* <RadioButton
                        value={data}
                        status={props.item.includes(data.id) ? 'checked' : 'unchecked'}
                        onPress={() => addContentHandler1(data)}
                    /> */}

                    <View key1={key} style={{ flex: 1, margin: 5 }}>
                        <Text style={{ color: "black" }}>{data.content}</Text>

                    </View>
                    <View key1={key} style={{ flex: 1, marginLeft: 30 }}>

                        <Text style={{ color: "orange" }}>${data.content_price}</Text>

                    </View>
                </TouchableOpacity>
            ))
        }

        else {

            return data.map((data, key) => (

                <TouchableOpacity key={key} style={{ flex: 1, alignItems: "center", flexDirection: "row", marginLeft: 10 }}
                    onPress={() => addContentHandler(data)}>
                    {/* <Checkbox
                        title={data}
                        status={props.item.includes(data.id) ? 'checked' : 'unchecked'}
                        onPress={() => addContentHandler(data)}

                    /> */}
                    <View key1={key} style={{ flex: 1, margin: 5 }}>
                        <Text style={{ color: "black" }}>{data.content}</Text>

                    </View>
                    <View key1={key} style={{ flex: 1, marginLeft: 30 }}>
                        <Text style={{ color: "orange" }}>${data.content_price}</Text>
                    </View>
                </TouchableOpacity>

            ))
        }
    }



    // component rendering
    // let data = data
    // let items = props.item
    return (

        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ padding: 5, elevation: 3 }}>
                <Text style={{ fontSize: 20, color: "black", }}>{props.data.category_name}</Text>
                <Text style={{ color: "orange", }}>{props.data.description}</Text>
                <View style={{ elevation: 3, flex: 1 }}>
                    {props.data.requried === null ?
                        <Text style={{ fontSize: 15, color: "#17baa1" }}>Choose Any</Text> :
                        <Text style={{ borderRadius: 3, padding: 3, elevation: 3, justifyContent: "center", fontSize: 15, width: 80, backgroundColor: "#ff726f", color: "#fff" }}>Requried {props.data.requried}</Text>}
                    {/* <Text>{m}</Text> */}
                </View>

            </View>
            {contentsMapHandler()}
        </View>




    )
};

export default ProductContentMap;
