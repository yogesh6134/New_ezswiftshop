import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Card, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function OrderProductItems(props) {
    const [data, setData] = useState(props.data);
    const [contents, setContents] = useState(props.data.content);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTokenhandler();
    }, []);

    async function getTokenhandler() {
        let token = await AsyncStorage.getItem('token');
        setToken(token);
    }

    const add_to_favourites = async () => {
        let res = await axios.get(data.add_in_favourites);
        props.fun();
    };

    function productContentMapHandler() {
        return contents.map((t, key) => (
            <View key={key} style={styles.contentContainer}>
                <Text style={styles.contentText}>{t.content}</Text>
            </View>
        ));
    }

    return (
        <Card style={styles.container}>
            <List.Item
                title={data.product.product_name}
                description={`$${data.price} | Qty: ${data.quantity}`}
                left={() => <Image style={styles.imgStyle} source={{ uri: data.product.product_image }} />}
                right={() => (
                    <TouchableOpacity onPress={add_to_favourites}>
                        <Icon name={data.inFavourite ? "md-heart" : "md-heart-outline"} color={data.inFavourite ? "red" : "#dcdcdc"} size={35} />
                    </TouchableOpacity>
                )}
            />
            {contents.length > 0 && (
                <View style={styles.contentWrapper}>
                    <Text style={styles.contentHeader}>Product Contents</Text>
                    {productContentMapHandler()}
                </View>
            )}
        </Card>
    );
}

const styles = {
    container: {
        backgroundColor: '#e0ffff',
        margin: 5,
        elevation: 3,
        padding: 10,
    },
    imgStyle: {
        height: 100,
        width: 100,
        borderRadius: 5,
    },
    contentWrapper: {
        marginTop: 10,
        padding: 10,
    },
    contentHeader: {
        color: "#17baa1",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
    },
    contentContainer: {
        elevation: 2,
        flex: 1,
        backgroundColor: "#fff",
        padding: 5,
        margin: 5,
        alignItems: "center",
    },
    contentText: {
        fontSize: 15,
        color: "orange",
    },
};

export default OrderProductItems;
