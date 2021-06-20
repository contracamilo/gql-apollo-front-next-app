import React, { useReducer } from "react";
import OrderContext from "./OrderContext";
import { SELECT_CLIENT, SELECT_PRODUCT, PRODUCT_QUANTITY } from "../../types";
import OrderReducer from "./OrderReducer";

const OrderState = ({ children }) => {
  const initialState = {
    client: [],
    products: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const addClientToOrder = (client) =>
    dispatch({
      type: SELECT_CLIENT,
      payload: client,
    });

  console.log("state", state);

  return (
    <OrderContext.Provider value={{ addClientToOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
