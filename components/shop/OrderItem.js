import React, { useState } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";

import CartItem from "./CartItem";
import Cart from "../UI/Cart";

const OrderItem = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <Cart style={styles.screen}>
      <View style={styles.summary}>
        <Text>$ {props.orders.totalAmount.toFixed(2)}</Text>
        <Text>{props.orders.readableDate}</Text>
      </View>
      <View style={styles.action}>
        <Button
          title={showDetail ? "Hide Details" : "Show Detail"}
          onPress={() => {
            setShowDetail((preState) => !preState);
          }}
        />
      </View>
      {showDetail && (
        <FlatList
          data={props.orders.items}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => <CartItem items={itemData.item} />}
        />
      )}
    </Cart>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  action: {
    alignItems: "center",
  },
});

export default OrderItem;
