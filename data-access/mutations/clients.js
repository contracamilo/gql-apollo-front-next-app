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

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
      id
      name
      lastname
      company
      email
      phone
    }
  }
`;
