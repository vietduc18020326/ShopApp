import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orders";
const initState = { orders: [] };

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrders = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.totalAmount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrders),
      };
  }
  return state;
};
