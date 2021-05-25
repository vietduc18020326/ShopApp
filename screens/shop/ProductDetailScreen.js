import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as cartActions from "../../store/actions/cart";

import HeaderScreen from "../../components/HeaderScreen";

const ProductDetailScreen = (props) => {
  const { prodId } = props.route.params;
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === prodId)
  );
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
      <HeaderScreen title="Product Detail" renderLeftBtn={renderLeftBtn} />
      <ScrollView>
        <Image
          source={{ uri: selectedProduct.imageUrl }}
          style={styles.image}
        />
        <View style={styles.action}>
          <Button
            title="Add Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(selectedProduct));
            }}
          />
        </View>
        <Text style={styles.price}>${selectedProduct.price}</Text>
        <Text style={styles.descrip}>{selectedProduct.description}</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: Dimensions.get("window").height / 3,
  },
  action: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    textAlign: "center",
    marginVertical: 10,
  },
  descrip: {
    textAlign: "center",
    fontSize: 14,
  },
});

export default ProductDetailScreen;
