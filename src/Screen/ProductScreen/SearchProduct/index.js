import React from 'react';
import { TextInput, View, Text, Button, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import Icon from "react-native-vector-icons/Ionicons"


const SearchProduct = ({navigation}) => {

    // state variables
    const [input, setInput] = React.useState("")
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)


    // useEffect
    // React.useEffect(() => {})


    // functions
    const onChangeTextHandler = (value) => {
        setInput(value)
    }


    const onButtonPressHandler = async () => {
        setLoading(true)
        // axios.get("http://54.163.88.91/product/search/?q="+this.state.input)
        // .then(function(response){
        // 	self.setState({data:response.data})
        // 	self.setState({loading:false})
        // })
        await fetch("http://100.26.11.43/product/search/?q=" + input)
            .then(response => response.json())
            .then(data => {
                setData(data)
                setLoading(false)
            });
    }


    const mapProduct = () => {
        return data.map((t, key) => {
            return (
                <SearchListProductItem
                    data={t}
                    key={key}
                />)
        })
    }


    // component rendering
    if (loading) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.viewStyle}>
                    <Icon name="arrow-back-outline" size={25} color="#eee"
                        style={{ marginRight: 10 }}
                        onPress={() => { navigation.goBack() }} />
                    <View style={styles.viewStyle2}>
                        <TextInput placeholder="search product"
                            value={input}
                            style={styles.inputStyle}
                            onChangeText={onChangeTextHandler} />
                        <Icon style={styles.buttonStyle}
                            name="search"
                            // style={{ color: "grey" }}/
                            size={25}
                            onPress={onButtonPressHandler} />
                    </View>
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
            <View style={{ flex: 1 }}>
                <View style={styles.viewStyle}>
                    <Icon name="arrow-back-outline" size={25} color="#eee"
                        style={{ marginRight: 10 }}
                        onPress={() => { navigation.goBack() }} />
                    <View style={styles.viewStyle2}>
                        <TextInput placeholder="search product "
                            value={input}
                            style={styles.inputStyle}
                            onChangeText={onChangeTextHandler} />
                        <Icon style={styles.buttonStyle}
                            name="search"
                            // style={{ color: "grey" }}
                            size={25}
                            onPress={onButtonPressHandler} />
                    </View>
                </View>
                <ScrollView>
                    {mapProduct()}
                </ScrollView>
            </View>
        )
    }
};

const styles = {
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
    viewStyle: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        // width: '0%'
    },
    viewStyle2: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        border: 2,
        borderRadius: 3,
        marginTop: 5,
        width: '90%'
    },
    inputStyle: {
        width: "85%",
        padding: 0,
        color: '#17baa1',
        fontSize: 18,
        // width: '90%'
        // marginLeft:20,
        // height: 25
    },
    buttonStyle: {
        width: "20%",
        color: '#fff',
        height: 25,
        color: "grey" 
    }
}

export default SearchProduct;
