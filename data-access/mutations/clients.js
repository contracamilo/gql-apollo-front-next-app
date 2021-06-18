import { gql } from "@apollo/client";

export const ADD_NEW_CLIENT = gql`
  mutation addClient($input: ClientInput) {
    addClient(input: $input) {
      id
      name
      lastname
      company
      phone
      email
    }
  }
`;
