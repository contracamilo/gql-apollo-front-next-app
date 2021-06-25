import React, { useReducer } from "react";
import OrderContext from "./OrderContext";
import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  PRODUCT_QUANTITY,
  UPDATE_TOTAL,
} from "../../types";
import OrderReducer from "./OrderReducer";

const OrderState = ({ children }) => {
  const initialState = {
    clients: [],
    products: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const addClientToOrder = (client) => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client,
    });
  };

  const addProductToOrder = (selectedProducts) => {
    let newState;

    if (state.products.length > 0) {
      newState = selectedProducts.map((product) => {
        const newObject = state.products.find(
          (stateProduct) => stateProduct.id === product.id
        );
        return { ...product, ...newObject };
      });
    } else {
      newState = selectedProducts;
    }

    dispatch({
      type: SELECT_PRODUCT,
      payload: newState,
    });
  };

  const productQuantity = (selectedProducts) => {
    dispatch({
      type: PRODUCT_QUANTITY,
      payload: selectedProducts,
    });
  };

  const updateTotal = () => {
    dispatch({
      type: UPDATE_TOTAL,
    });
  };

  console.log("state", state);

  const value = {
    clients: state.client,
    products: state.products,
    addClientToOrder,
    addProductToOrder,
    productQuantity,
    updateTotal,
    total: state.total,
  };

  return (
    <OrderContext.Provider value={{ ...value }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
