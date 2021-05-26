import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

import Cart from "../UI/Cart";

const ProductItem = (props) => {
  return (
    <Cart style={styles.product}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: props.image }} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
        <Text>${props.price.toFixed(2)}</Text>
      </View>
      <View style={styles.button}>{props.children}</View>
    </Cart>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 500,
    margin: 20,
  },
  imageContainer: {
    height: "60%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 16,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
    marginHorizontal: 10,
  },
  details: {
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
  },
});

export default ProductItem;
