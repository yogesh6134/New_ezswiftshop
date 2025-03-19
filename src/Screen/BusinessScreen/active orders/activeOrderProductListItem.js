import React from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StatusBar } from 'react-native';
import { Card, List, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ListActiveOrderItems extends React.Component {
  state = {
    data: this.props.data,
    contents: this.props.data.content,
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

  productContentMapHandler() {
    return this.state.contents.map((t, key) => (
      <Card key={key} style={{ margin: 5, padding: 10, elevation: 3 }}>
        <Text style={{ fontSize: 15 }}>{t.content}</Text>
      </Card>
    ));
  }

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <Card style={{ margin: 5, padding: 10, elevation: 3 }}>
          <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={styles.imgStyle} source={{ uri: data.product.product_image }} />
              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{data.product.product_name}</Text>
                <Text style={{ color: "#17baa1", fontSize: 15, fontWeight: "bold" }}>₹{data.product.product_price}</Text>
                <Text>Qty: {data.quantity}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Text style={{ color: "#17baa1", fontSize: 17, fontWeight: 'bold' }}>Product Contents</Text>
        </View>
        {this.productContentMapHandler()}
      </View>
    );
  }
}

export default ListActiveOrderItems;

const styles = {
  container: {
    backgroundColor: '#e0ffff',
    flex: 1,
    margin: 5,
  },
  imgStyle: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10
  },
};