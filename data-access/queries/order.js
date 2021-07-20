import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query getOrders {
    getOrders {
      id
      order {
        id
        name
        quantity
      }
      client {
        name
        lastname
        email
      }
      salesPerson
      total
      status
    }
  }
`;

export const GET_ORDERS_BY_SALESPERSON = gql`
  query getOrdersBySalesPerson {
    getOrdersBySalesPerson {
      id
      order {
        id
        name
        quantity
      }
      client {
        id
        name
        lastname
        phone
        email
      }
      salesPerson
      total
      status
    }
  }
`;
