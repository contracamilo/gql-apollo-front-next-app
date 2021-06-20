import { gql } from "@apollo/client";

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteClient(id: $id)
  }
`;

export const ADD_NEW_PRODUCT = gql`
  mutation addNewProduct($input: ProductInput) {
    addNewProduct(input: $input) {
      id
      name
      stock
      price
      createdAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      id
      name
      stock
      price
      createdAt
    }
  }
`;
