import { gql } from "@apollo/client";

export const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
      status
      id
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID) {
    deleteOrder(id: $id)
  }
`;
