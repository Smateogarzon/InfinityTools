import { gql } from '@apollo/client';

export const addShoppingCart = gql`
  mutation addProductToCart($createShoppingCartInput: CreateShoppingCartInput!) {
    addProductToCart(createShoppingCartInput: $createShoppingCartInput) {
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
