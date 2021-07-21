import { gql } from "@apollo/client";

export const GET_AUTH_USER = gql`
  query getAuthUser {
    getAuthUser {
      id
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getClientByID($id: ID!) {
    getClientByID(id: $id) {
      id
      name
      lastname
    }
  }
`;

export const GET_TOP_SALES_PERSON = gql`
  query getTopSalesPerson {
    getTopSalesPerson {
      total
      salesPerson {
        name
        email
      }
    }
  }
`;
