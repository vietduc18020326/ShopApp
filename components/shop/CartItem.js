import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import * as cartActions from "../../store/actions/cart";

const CartItem = (props) => {
  const items = props.items;
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{items.quantity}</Text>{" "}
        <Text style={styles.mainText}>{items.prodTitle}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>$ {items.sum.toFixed(2)}</Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(cartActions.removeFromCart(items.prodId));
          }}
        >
          <Ionicons name="md-trash" size={23} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainText: {
    fontSize: 16,
  },
  quantity: {
    color: "#888",
  },
});

export default CartItem;
