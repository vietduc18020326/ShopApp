import React from "react";
import { View, Text, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import HeaderScreen from "../../components/HeaderScreen";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <View>
      <HeaderScreen
        title="Your Orders"
        renderLeftBtn={() => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Cart"
              iconName="md-menu"
              onPress={() => {
                props.navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        )}
      />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => <OrderItem orders={itemData.item} />}
      />
    </View>
  );
};

export default OrdersScreen;
