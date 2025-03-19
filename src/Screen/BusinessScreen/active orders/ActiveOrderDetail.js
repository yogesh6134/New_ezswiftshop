import React from 'react';
import axios from 'axios';
import { View, ScrollView, Text, TouchableOpacity, Button, Image, ActivityIndicator, StatusBar, Linking } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListActiveOrderItems from './activeOrderProductListItem';

class ActiveOrderDetail extends React.Component {
  state = {
    data: {},
    customer: {},
    shipping: {},
    cart: {},
    product: [],
    delivery: {},
    token: "",
    loading: true,
  };

  componentDidMount() {
    this.getTokenhandler();
  }

  async getTokenhandler() {
    let token = await AsyncStorage.getItem('token');
    this.setState({ token });
    const { data1 } = this.props.navigation.state.params;
    let res = await axios.get(data1.order_detail, {
      headers: { Authorization: token },
    });
    this.setState({
      data: res.data,
      customer: res.data.customer,
      shipping: res.data.shipping_address,
      cart: res.data.cart,
      product: res.data.cart.product,
      delivery: res.data.delivery_person,
      loading: false,
    });
  }

  reloadFun = () => {
    this.setState({ loading: true }, this.getTokenhandler);
  };

  productMapHandler() {
    return this.state.product.map((t, key) => <ListActiveOrderItems data={t} key={key} />);
  }

  orderReadyHandler = async () => {
    this.setState({ loading: true });
    await axios.get(this.state.data.click_order_ready, {
      headers: { Authorization: this.state.token },
    });
    this.reloadFun();
  };

  orderShipHandler = async () => {
    this.setState({ loading: true });
    await axios.get(this.state.data.ship_order, {
      headers: { Authorization: this.state.token },
    });
    this.reloadFun();
  };

  appointAHandler = async () => {
    this.setState({ loading: true });
    await axios.get(this.state.data.click_appoint_collector, {
      headers: { Authorization: this.state.token },
    });
    this.reloadFun();
  };

  _handlePress = () => Linking.openURL(`tel:${this.state.delivery.contact_number}`);
  _handlePress2 = () => Linking.openURL(`tel:${this.state.shipping.phone_number}`);
  _handlePress3 = () => Linking.openURL(`tel:${this.state.shipping.alternate_phone_number}`);

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#17baa1" style={styles.activityStyle} />
          <StatusBar barStyle="default" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView style={{ backgroundColor: "#eee" }}>
          <Card style={styles.cardStyle}>
            <Card.Content>
              <Text style={styles.textStyle1}>Order ID:</Text>
              <Text style={styles.textStyle2}>{this.state.data.order_id}</Text>
            </Card.Content>
          </Card>

          <Card style={styles.cardStyle}>
            <Card.Content>
              <Text style={styles.textStyle1}>Customer Name:</Text>
              <Text style={styles.textStyle2}>{this.state.shipping.name}</Text>
            </Card.Content>
          </Card>

          <Card style={styles.cardStyle}>
            <Card.Content>
              <Text style={styles.textStyle1}>Shipping Address:</Text>
              <Text style={styles.textStyle2}>{this.state.shipping.address_line_1}, {this.state.shipping.city}</Text>
            </Card.Content>
          </Card>

          <View style={styles.buttonContainer}>
            {this.state.data.shipped === false && <Button color="#255" onPress={this.orderShipHandler} title="Ship Order" />}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  activityStyle: {
    padding: 30,
  },
  cardStyle: {
    margin: 10,
    elevation: 3,
    backgroundColor: "#fff",
  },
  textStyle1: {
    fontSize: 20,
    color: "#17baa1",
  },
  textStyle2: {
    fontSize: 15,
    color: "orange",
  },
  buttonContainer: {
    padding: 10,
  },
};

export default ActiveOrderDetail;