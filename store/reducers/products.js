import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.prodId,
        "u1",
        action.prodData.title,
        action.prodData.imageUrl,
        action.prodData.description,
        action.prodData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.prodId
      );
      const updateProduct = new Product(
        action.prodId,
        state.availableProducts[productIndex].ownerId,
        action.prodData.title,
        action.prodData.imageUrl,
        action.prodData.description,
        state.availableProducts[productIndex].price
      );
      const updateAvailableProducts = [...state.availableProducts];
      updateAvailableProducts[productIndex] = updateProduct;
      const updateUserProducts = [...state.userProducts];
      const userIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.prodId
      );
      updateUserProducts[userIndex] = updateProduct;
      return {
        ...state,
        availableProducts: updateAvailableProducts,
        userProducts: updateUserProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.id
        ),
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.id
        ),
      };
  }
  return state;
};
