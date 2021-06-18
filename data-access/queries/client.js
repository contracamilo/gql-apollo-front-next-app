import { gql } from "@apollo/client";

export const GET_USER_CLIENTS = gql`
  query getClientsBySalesPerson {
    getClientsBySalesPerson {
      name
      lastname
      company
      email
    }
  }
`;
