import React, { Component } from 'react';
import { 
    Button, Image, View, Text, TouchableOpacity, 
    AsyncStorage, ScrollView, TextInput, ActivityIndicator, 
    ImageBackground, StyleSheet 
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

var backgroundImage = require("../../assets/Screenshot_20200703-173531.png");

export default class ShopAddProduct extends Component {
    state = {
        product_code: "",
        product_name: "",
        product_price: null,
        product_image: null,
        quantity: null,
        description: "",
        active: true,
        Aisle_number: "",
        Shelf_number: "",
        Shelf_side: "Empty",
        Category: "",
        loading: false,
        token: "",
        data: [],
        superuser: false
    };

    async componentDidMount() {
        const { shopdata } = await this.props.navigation.state.params;
        this.setState({ shopdata });
        this.categoriesRetrieveHandler();
        const token = await AsyncStorage.getItem('token');
        this.setState({ token });
    }

    categoriesRetrieveHandler = async () => {
        let res = await axios.get("http://100.26.11.43/product/list/cat/");
        this.setState({ data: res.data });
    };

    categoriesMapHandler = () => {
        return this.state.data.map((i, key) => (
            <Picker.Item label={i.category_name} value={i.id} key={key} />
        ));
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibrary({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });
        if (result.assets && result.assets.length > 0) {
            this.setState({ product_image: result.assets[0].uri });
        }
    };

    imageUploadHandler = async () => {
        this.setState({ loading: true });
        let photo = {
            uri: this.state.product_image,
            name: 'product.jpg',
            type: 'image/jpg'
        };
        let newData = new FormData();
        newData.append("product_image", photo);
        newData.append("product_name", this.state.product_name);
        newData.append("product_code", this.state.product_code);
        newData.append("product_price", this.state.product_price);
        newData.append("quantity", this.state.quantity);
        newData.append("description", this.state.description);
        newData.append("Category", this.state.Category);
        newData.append("active", this.state.active);
        newData.append("Aisle_number", this.state.Aisle_number);
        newData.append("Shelf_number", this.state.Shelf_number);
        newData.append("Shelf_side", this.state.Shelf_side);
        newData.append("user", this.state.shopdata.user);
        newData.append("shop_name", this.state.shopdata.id);

        await fetch("http://100.26.11.43/product/LC/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': this.state.token
            },
            body: newData
        });

        this.setState({ loading: false });
        this.props.navigation.goBack();
    };

    render() {
        const { product_image, loading } = this.state;

        if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#17baa1" />
                </View>
            );
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <MaterialCommunityIcons style={styles.backIcon} size={25} name="arrow-left" />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.mainContainer}>
                    <View style={styles.container}>
                        <Text style={styles.textStyle}>Product image</Text>
                        <TouchableOpacity onPress={this._pickImage} style={styles.imagePicker}>
                            <ImageBackground source={backgroundImage} style={styles.imgStyle}>
                                {product_image && <Image source={{ uri: product_image }} style={styles.imgStyle} />}
                            </ImageBackground>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.input}
                            placeholder="Product Name"
                            value={this.state.product_name}
                            onChangeText={(value) => this.setState({ product_name: value })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Product BarCode"
                            value={this.state.product_code}
                            onChangeText={(value) => this.setState({ product_code: value })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            keyboardType="numeric"
                            value={this.state.product_price}
                            onChangeText={(value) => this.setState({ product_price: value })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Quantity"
                            keyboardType="numeric"
                            value={this.state.quantity}
                            onChangeText={(value) => this.setState({ quantity: value })}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            multiline
                            value={this.state.description}
                            onChangeText={(value) => this.setState({ description: value })}
                        />

                        <Text style={styles.textStyle}>Shelf Side</Text>
                        <Picker
                            selectedValue={this.state.Shelf_side}
                            onValueChange={(itemValue) => this.setState({ Shelf_side: itemValue })}
                        >
                            <Picker.Item label="Empty" value="Empty" />
                            <Picker.Item label="Left" value="Left" />
                            <Picker.Item label="Right" value="Right" />
                        </Picker>

                        <Text style={styles.textStyle}>Select Category</Text>
                        <Picker
                            selectedValue={this.state.Category}
                            onValueChange={(itemValue) => this.setState({ Category: itemValue })}
                        >
                            {this.categoriesMapHandler()}
                        </Picker>

                        <TouchableOpacity style={styles.buttonContainer}>
                            <Button color="orange" title="Create" onPress={this.imageUploadHandler} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    header: {
        backgroundColor: "black",
        padding: 12
    },
    backIcon: {
        color: "white"
    },
    mainContainer: {
        backgroundColor: "#fff",
    },
    container: {
        margin: 10,
        padding: 15,
        backgroundColor: "rgb(245, 245, 245)",
        borderRadius: 3,
        elevation: 3
    },
    textStyle: {
        fontSize: 15,
        color: "#17baa1",
        margin: 5
    },
    input: {
        borderWidth: 1,
        borderColor: "rgb(204, 204, 204)",
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 5,
        borderRadius: 3
    },
    imgStyle: {
        width: 306,
        height: 200,
        backgroundColor: "#fff",
        borderRadius: 2,
    },
    buttonContainer: {
        marginTop: 20
    }
});
