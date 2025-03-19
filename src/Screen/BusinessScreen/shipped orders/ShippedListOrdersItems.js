import React from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Button } from 'react-native-paper';

class ShippedList extends React.Component {
  state = {
    data: this.props.data,
    cart: this.props.data.cart,
    product: this.props.data.cart.product,
    token: "",
    loading: false
  };

  componentDidMount() {
    this.getTokenHandler();
  }

  async getTokenHandler() {
    let token = await AsyncStorage.getItem('token');
    this.setState({ token });
  }

  AcceptOrderHandler = async () => {
    this.setState({ loading: true });
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(this.state.data.accept_order, {
      headers: { Authorization: token }
    });
    this.setState({ loading: false });
    console.log(res.data.message);
    this.props.fun();
  };

  RejectOrderHandler = async () => {
    this.setState({ loading: true });
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(this.state.data.cancel_order, {
      headers: { Authorization: token }
    });
    this.setState({ loading: false });
    console.log(res.data.message);
    this.props.fun();
  };

  productMapHandler() {
    return this.state.product.map((t, key) => (
      <Card key={key} style={styles.cardContainer}>
        <Card.Content>
          <View style={styles.rowStyle}>
            <Image style={styles.imgStyle} source={{ uri: t.product.product_image }} />
            <View style={{ marginLeft: 10 }}>
              <Text>{t.product.product_name}</Text>
              <Text style={styles.priceStyle}>₹{t.product.product_price}</Text>
              <Text>Qty: {t.quantity}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    ));
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color="#17baa1" />
          <StatusBar barStyle="default" />
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={{ backgroundColor: "#eee" }} onPress={() => { this.props.navigation.navigate('shippedDetail', { data: this.props.data }); }}>
          <Card style={styles.cardContainer}>
            <Card.Content>
              <View style={styles.rowCenter}>
                <Text style={styles.orderText}>Order ID:</Text>
                <Text style={styles.orderIdText}>{this.state.data.order_id}</Text>
              </View>
              {this.productMapHandler()}
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.summaryStyle}>Order Summary</Text>
                <Text>Total Items: {this.state.cart.total_items}</Text>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      );
    }
  }
}

export default ShippedList;

const styles = {
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: "#fff"
  },
  cardContainer: {
    margin: 10,
    padding: 10,
    elevation: 3,
    backgroundColor: "#fff"
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowCenter: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center"
  },
  orderText: {
    fontSize: 20,
    color: "#17baa1"
  },
  orderIdText: {
    fontSize: 20,
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: "orange"
  },
  imgStyle: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderColor: "#eee"
  },
  priceStyle: {
    color: "#17baa1",
    fontSize: 15,
    fontWeight: "bold"
  },
  summaryStyle: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10
  }
};