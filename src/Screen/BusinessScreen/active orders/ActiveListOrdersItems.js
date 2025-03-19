import React from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StatusBar } from 'react-native';
import { List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class ActiveList extends React.Component {
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
    await axios.get(this.state.data.accept_order, { headers: { Authorization: token } });
    this.setState({ loading: false });
    this.props.fun();
  };

  RejectOrderHandler = async () => {
    this.setState({ loading: true });
    let token = await AsyncStorage.getItem('token');
    await axios.get(this.state.data.cancel_order, { headers: { Authorization: token } });
    this.setState({ loading: false });
    this.props.fun();
  };

  productMapHandler() {
    return this.state.product.map((t, key) => (
      <View key={key} style={styles.container}>
        <List.Item
          title={t.product.product_name}
          description={`₹${t.product.product_price} | Qty: ${t.quantity}`}
          left={() => (
            <Image style={styles.imgStyle} source={{ uri: t.product.product_image }} />
          )}
        />
      </View>
    ));
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <View style={styles.activityStyle}>
            <ActivityIndicator size="large" color="#17baa1" />
            <StatusBar barStyle="default" />
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={{ backgroundColor: "#eee" }} onPress={() => { this.props.navigation.navigate('activeDetail', { data1: this.props.data }) }}>
          <View style={{ backgroundColor: "#fff", padding: 10, margin: 10, elevation: 3 }}>
            <View style={{ flexDirection: "row", padding: 10, justifyContent: "center" }}>
              <Text style={{ textDecorationLine: "underline", fontSize: 23, color: "#17baa1" }}>Order ID: </Text>
              <Text style={{ color: "orange", fontSize: 20 }}>{this.state.data.order_id}</Text>
            </View>
            {this.productMapHandler()}
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.SummaryStyle}> Order Summary</Text>
              <List.Item title={`Total Items: ${this.state.cart.total_items}`} />
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

export default ActiveList;

const styles = {
  activityStyle: {
    padding: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderColor: "#17baa1"
  },
  container: {
    backgroundColor: '#e0ffff',
    margin: 5,
    borderColor: "#e0ffff",
    borderWidth: 2,
    elevation: 3
  },
  imgStyle: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderColor: "#eee"
  },
  SummaryStyle: {
    alignItems: "center",
    color: "grey"
  }
};
