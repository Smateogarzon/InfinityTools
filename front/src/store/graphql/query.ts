import { gql } from '@apollo/client';

export const getCart = gql`
  query FindCart {
    FindCart {
      _id
      products {
        idProduct

        priceProduct

        quantity

        total
      }
      total
      totalItems
    }
  }
`;
