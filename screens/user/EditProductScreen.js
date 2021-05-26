import React, { useState, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";

import * as productActions from "../../store/actions/products";
import HeaderScreen from "../../components/HeaderScreen";
import HeaderButton from "../../components/UI/HeaderButton";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updateValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updateValidate = {
      ...state.inputValidates,
      [action.input]: action.isVaid,
    };
    const updateIsValid = true;
    for (const key in updateValidate) {
      updateIsValid = updateIsValid && updateValidate[key];
    }
    return {
      ...state,
      inputValues: updateValues,
      inputValidates: updateValidate,
      formIsValid: updateIsValid,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const { prodId } = props.route.params;
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === prodId)
  );
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: prodId ? product.title : "",
      imageUrl: prodId ? product.imageUrl : "",
      description: prodId ? product.description : "",
      price: "",
    },
    inputValidates: {
      title: prodId ? true : false,
      imageUrl: prodId ? true : false,
      description: prodId ? true : false,
      price: prodId ? true : false,
    },
    formIsValid: false,
  });
  const [title, setTitle] = useState(prodId ? product.title : "");
  const [imageUrl, setImageUrl] = useState(prodId ? product.imageUrl : "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    prodId ? product.description : ""
  );

  const submitHanler = () => {
    console.log(formState);
    // if (!formState.formIsValid) {
    //   Alert.alert("Wrong input", "Please check error in form", [
    //     { text: "Okay" },
    //   ]);
    //   return;
    // }
    if (prodId) {
      dispatch(
        productActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description
        )
      );
      return;
    }
    dispatch(
      productActions.createProduct(
        prodId,
        formState.inputValues.title,
        formState.inputValues.imageUrl,
        formState.inputValues.description,
        +formState.inputValues.price
      )
    );
  };
  const changeHander = (inputIndentifier, text) => {
    let isVaid = false;
    if (text.trim().length > 0) isVaid = true;
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isVaid: isVaid,
      input: inputIndentifier,
    });
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
              value={formState.inputValues.title}
              onChangeText={changeHander.bind(this, "title")}
            />
          </View>
          <View style={styles.form}>
            <Text>Image URL</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.imageUrl}
              onChangeText={changeHander.bind(this, "imageUrl")}
            />
          </View>
          {prodId ? null : (
            <View style={styles.form}>
              <Text>Price</Text>
              <TextInput
                style={styles.input}
                value={formState.inputValues.price}
                onChangeText={changeHander.bind(this, "price")}
                keyboardType="decimal-pad"
              />
            </View>
          )}
          <View style={styles.form}>
            <Text>Description</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.description}
              onChangeText={changeHander.bind(this, "description")}
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
