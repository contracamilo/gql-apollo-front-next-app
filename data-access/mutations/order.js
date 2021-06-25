import { gql } from "@apollo/client";

export const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
      order {
        id
        quantity
      }
      client
      total
      status
    }
  }
`;
