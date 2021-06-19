import { gql } from "@apollo/client";

export const GET_USER_CLIENTS = gql`
  query getClientsBySalesPerson {
    getClientsBySalesPerson {
      id
      name
      lastname
      company
      email
    }
  }
`;

export const GET_CLIENT_BY_ID = gql`
  query getClientByID($id: ID!) {
    getClientByID(id: $id) {
      id
      name
      lastname
      email
      phone
      company
    }
  }
`;
