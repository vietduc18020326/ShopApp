import React from "react";
import { FlatList, View, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderScreen from "../../components/HeaderScreen";
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import * as cartActions from "../../store/actions/cart";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const viewItemHanler = (product) => {
    props.navigation.navigate("product-detail", {
      prodId: product.id,
    });
  };
  return (
    <View>
      <HeaderScreen
        title="All Products"
        renderRightBtn={() => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Cart"
              iconName="md-cart"
              onPress={() => {
                props.navigation.navigate("cart");
              }}
            />
          </HeaderButtons>
        )}
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
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            title={itemData.item.title}
            image={itemData.item.imageUrl}
            price={itemData.item.price}
          >
            <Button
              title="View Details"
              onPress={() => viewItemHanler(itemData.item)}
            />
            <Button
              title="To Cart"
              onPress={() => dispatch(cartActions.addToCart(itemData.item))}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

export default ProductsOverviewScreen;
