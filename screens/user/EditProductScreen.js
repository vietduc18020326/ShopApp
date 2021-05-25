import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";

import * as productActions from "../../store/actions/products";
import HeaderScreen from "../../components/HeaderScreen";
import HeaderButton from "../../components/UI/HeaderButton";

const EditProductScreen = (props) => {
  const { prodId } = props.route.params;
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === prodId)
  );
  const [title, setTitle] = useState(prodId ? product.title : "");
  const [imageUrl, setImageUrl] = useState(prodId ? product.imageUrl : "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    prodId ? product.description : ""
  );

  const submitHanler = () => {
    if (prodId) {
      dispatch(
        productActions.updateProduct(prodId, title, imageUrl, description)
      );
      return;
    }
    dispatch(
      productActions.createProduct(prodId, title, imageUrl, description, price)
    );
  };
  const renderLeftBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("user-product")}
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
      <HeaderScreen
        title={prodId ? "Edit Product" : "Add Product"}
        renderLeftBtn={renderLeftBtn}
        renderRightBtn={() => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="edit" iconName="md-checkmark" onPress={submitHanler} />
          </HeaderButtons>
        )}
      />
      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.form}>
            <Text>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <View style={styles.form}>
            <Text>Image URL</Text>
            <TextInput
              style={styles.input}
              value={imageUrl}
              onChangeText={(text) => setImageUrl(text)}
            />
          </View>
          {prodId ? null : (
            <View style={styles.form}>
              <Text>Price</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={(text) => setPrice(text)}
              />
            </View>
          )}
          <View style={styles.form}>
            <Text>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 10,
  },
  form: {
    width: "100%",
    marginTop: 5,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
});

export default EditProductScreen;
