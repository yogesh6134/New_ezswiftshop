import React from 'react';
import axios from 'axios';
import { View, ScrollView, Text, TouchableOpacity, Button, Linking, Image, ActivityIndicator, StatusBar } from 'react-native';
import { List, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ShippedOrderDetail extends React.Component {
  state = {
    data: {},
    customer: {},
    shipping: {},
    cart: {},
    product: [],
    delivery: {},
    token: "",
    loading: false,
  };

  componentDidMount() {
    this.getTokenhandler();
  }

  async getTokenhandler() {
    let token = await AsyncStorage.getItem('token');
    this.setState({ token: token });
    const { data } = this.props.navigation.state.params;
    this.setState({
      data: data,
      customer: data.customer,
      shipping: data.shipping_address,
      cart: data.cart,
      product: data.cart.product,
      delivery: data.delivery_person,
    });
  }

  productMapHandler() {
    return this.state.product.map((t, key) => (
      <Card key={key} style={styles.cardStyle}>
        <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={styles.imgStyle} source={{ uri: t.product.product_image }} />
          <View style={{ marginLeft: 20 }}>
            <Text>{t.product.product_name}</Text>
            <Text style={{ color: "#17baa1", fontSize: 15, fontWeight: "bold" }}>₹{t.product.product_price}</Text>
            <Text>Qty: {t.quantity}</Text>
          </View>
        </Card.Content>
      </Card>
    ));
  }

  orderReadyHandler = async () => {
    this.setState({ loading: true });
    await axios.get(this.state.data.click_order_ready, {
      headers: { Authorization: this.state.token },
    });
    this.setState({ loading: false });
  };

  orderShipHandler = async () => {
    this.setState({ loading: true });
    await axios.get(this.state.data.ship_order, {
      headers: { Authorization: this.state.token },
    });
    this.setState({ loading: false });
  };

  _handlePress = () => Linking.openURL(`tel:${this.state.delivery.contact_number}`);
  _handlePress2 = () => Linking.openURL(`tel:${this.state.shipping.phone_number}`);
  _handlePress3 = () => Linking.openURL(`tel:${this.state.shipping.alternate_phone_number}`);

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color="#17baa1" />
          <StatusBar barStyle="default" />
        </View>
      );
    }

    return (
      <ScrollView style={{ backgroundColor: "#eee" }}>
        <Card style={styles.cardStyle}>
          <Card.Content>
            <Text style={styles.textStyle1}>Order ID: {this.state.data.order_id}</Text>
            <Text style={styles.textStyle1}>Order Status: {this.state.data.order_status}</Text>
            <Text style={styles.textStyle1}>Delivery Type: {this.state.data.delivery_status}</Text>
          </Card.Content>
        </Card>
        <Card style={styles.cardStyle}>
          <Card.Title title="Customer Details" titleStyle={{ color: "#17baa1", fontSize: 20 }} />
          <Card.Content>
            <Text>Name: {this.state.shipping.name}</Text>
            <Text>Address: {this.state.shipping.address_line_1}, {this.state.shipping.city}, {this.state.shipping.state}, {this.state.shipping.zip_code}</Text>
            <TouchableOpacity style={styles.buttonStyle} onPress={this._handlePress2}>
              <MaterialCommunityIcons name="phone" size={20} color="#fff" />
              <Text style={{ color: "#fff" }}>{this.state.shipping.phone_number}</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
        {this.state.delivery && (
          <Card style={styles.cardStyle}>
            <Card.Title title="Delivery Person Details" titleStyle={{ color: "#17baa1", fontSize: 20 }} />
            <Card.Content>
              <Image style={styles.imgStyle2} source={{ uri: this.state.delivery.person_photo }} />
              <Text>Name: {this.state.delivery.first_name} {this.state.delivery.last_name}</Text>
              <TouchableOpacity style={styles.buttonStyle} onPress={this._handlePress}>
                <MaterialCommunityIcons name="phone" size={20} color="#fff" />
                <Text style={{ color: "#fff" }}>{this.state.delivery.contact_number}</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        )}
        <Card style={styles.cardStyle}>
          <Card.Title title="Order Details" titleStyle={{ color: "#17baa1", fontSize: 20 }} />
          <Card.Content>{this.productMapHandler()}</Card.Content>
        </Card>
      </ScrollView>
    );
  }
}

export default ShippedOrderDetail;

const styles = {
  cardStyle: {
    backgroundColor: "#fff",
    margin: 10,
    elevation: 3,
    padding: 10,
  },
  imgStyle: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderColor: "#fff",
  },
  imgStyle2: {
    height: 200,
    width: 200,
    borderWidth: 2,
    borderColor: "#eee",
    alignSelf: "center",
    marginBottom: 10,
  },
  textStyle1: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  buttonStyle: {
    flexDirection: "row",
    backgroundColor: "#17baa1",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  activityContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
};
