import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import ShopNavigator from "./ShopNavigator";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import AdminNavigator from "./AdminNavigator";

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="product"
        component={ShopNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="md-cart" size={23} color="red" />
          ),
        }}
      />
      <Drawer.Screen
        name="orders"
        component={OrdersScreen}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="md-menu" size={23} color="red" />
          ),
        }}
      />
      <Drawer.Screen
        name="user "
        component={AdminNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons name="md-create" size={23} color="red" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
