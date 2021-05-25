import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";
const initState = {
  items: {},
  totalAmount: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      let updatedOrNewCartItem;
      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          addedProduct.price,
          addedProduct.title,
          state.items[addedProduct.id].sum + addedProduct.price
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          addedProduct.price,
          addedProduct.title,
          addedProduct.price
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + addedProduct.price,
      };
    case REMOVE_FROM_CART:
      let updatedCartItems;
      const currentQty = state.items[action.id].quantity;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          state.items[action.id].quantity - 1,
          state.items[action.id].productPrice,
          state.items[action.id].productTitle,
          state.items[action.id].sum - state.items[action.id].productPrice
        );
        updatedCartItems = {
          ...state.items,
          [action.id]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedOrNewCartItem.items[action.id];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - state.items[action.id].productPrice,
      };
    case ADD_ORDER:
      return initState;
    case DELETE_PRODUCT:
      if (!state.items[action.id]) {
        return state;
      }
      const updateItems = { ...state.items };
      const totalItem = updateItems[action.id].sum;
      delete updateItems[action.id];
      return {
        ...state,
        items: updateItems,
        totalAmount: state.totalAmount - totalItem,
      };
  }
  return state;
};
