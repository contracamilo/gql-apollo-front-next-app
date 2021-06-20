import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      price
      stock
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query getProductByID($id: ID!) {
    getProductByID(id: $id) {
      id
      name
      price
      stock
    }
  }
`;
