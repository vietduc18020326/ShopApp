import React from "react";
import { FlatList, View, Button, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderScreen from "../../components/HeaderScreen";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as productAction from "../../store/actions/products";

const UserProductScreen = (props) => {
  const userProduct = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const deleteHanler = (id) => {
    Alert.alert("Are you sure", "Do you want to delete product", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(productAction.deleteProduct(id)),
      },
    ]);
  };
  return (
    <View>
      <HeaderScreen
        title="User Product"
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
        renderRightBtn={() => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="edit"
              iconName="md-create"
              onPress={() => {
                props.navigation.navigate("edit-product", {
                  prodId: "",
                });
              }}
            />
          </HeaderButtons>
        )}
      />
      <FlatList
        data={userProduct}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            title={itemData.item.title}
            image={itemData.item.imageUrl}
            price={itemData.item.price}
          >
            <Button
              title="Edit"
              onPress={() => {
                props.navigation.navigate("edit-product", {
                  prodId: itemData.item.id,
                });
              }}
            />
            <Button
              title="Delete"
              onPress={() => deleteHanler(itemData.item.id)}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

export default UserProductScreen;
