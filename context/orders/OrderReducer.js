import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  PRODUCT_QUANTITY,
  UPDATE_TOTAL,
} from "../../types";

const OrderReducer = (state, action) => {
  switch (action.type) {
    case SELECT_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case PRODUCT_QUANTITY:
      return {
        ...state,
        products: (state.products || []).map((product) => {
          return product.id === action.payload.id
            ? (product = action.payload)
            : action.payload;
        }),
      };
    case UPDATE_TOTAL:
      return {
        ...state,
        total: state.products.reduce((accumulate, product) => {
          const { price, quantity } = product;
          return (accumulate += price * quantity);
        }, 0),
      };
    default:
      break;
  }
};

export default OrderReducer;