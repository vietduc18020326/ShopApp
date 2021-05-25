import React from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HeaderScreen from "../../components/HeaderScreen";
import CartItem from "../../components/shop/CartItem";
import * as orderActions from "../../store/actions/orders";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        prodId: key,
        prodPrice: state.cart.items[key].productPrice,
        prodTitle: state.cart.items[key].productTitle,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) => (a.prodId > b.prodId ? 1 : -1));
  });
  const renderLeftBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("product-overview")}
      >
        <MaterialCommunityIcons
          name="keyboard-backspace"
          color="white"
          size={30}
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <HeaderScreen title="Cart" renderLeftBtn={renderLeftBtn} />
      <View style={styles.screen}>
        <View style={styles.summary}>
          <Text>
            Total: <Text>${cartTotalAmount.toFixed(2)}</Text>
          </Text>
          <Button
            disabled={cartItems.length === 0}
            title="Order Now"
            onPress={() => {
              dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
            }}
          />
        </View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.prodId}
          renderItem={(itemData) => <CartItem items={itemData.item} />}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 50,
    marginBottom: 20,
  },
});
export default CartScreen;
