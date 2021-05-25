import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="user-product" component={UserProductScreen} />
      <Stack.Screen name="edit-product" component={EditProductScreen} />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
