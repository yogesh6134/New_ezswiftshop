import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const OrderProductListItem = ({ data }) => {
  if (!data?.cart?.product?.length) return null; // Prevents crashes

  const productData = data.cart.product[0];

  return (
    <Card style={styles.container}>
      <View style={styles.contentContainer}>
        <Image style={styles.imgStyle} source={{ uri: productData?.product?.product_image }} />
        <Card.Content style={styles.detailsContainer}>
          <Title>{productData?.product?.product_name}</Title>
          <Paragraph style={styles.price}>₹{productData?.price}</Paragraph>
          <Paragraph>Qty: {productData?.quantity}</Paragraph>
        </Card.Content>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0ffff",
    margin: 5,
    elevation: 3,
    borderRadius: 8,
    padding: 10,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgStyle: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 8,
  },
  detailsContainer: {
    marginLeft: 15,
    flex: 1,
  },
  price: {
    color: "#17baa1",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default OrderProductListItem;
