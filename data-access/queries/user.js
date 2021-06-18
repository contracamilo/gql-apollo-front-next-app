import { gql } from "@apollo/client";

export const GET_AUTH_USER = gql`
  query getAuthUser {
    getAuthUser {
      id
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserByID($id: ID!) {
    getUserByID(id: $id) {
      id
      name
      lastname
    }
  }
`;
