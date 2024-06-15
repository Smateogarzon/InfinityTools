import { gql } from '@apollo/client';

export const getProductsCart = gql`
  query FindOneproduct($id: String!) {
    FindOneproduct(id: $id) {
      _id
      name
      picture
      brand {
        _id
        name
      }
    }
  }
`;
export const addProduct = gql`
  mutation updateProductToCart($createShoppingCartInput: CreateShoppingCartInput!) {
    updateProductToCart(createShoppingCartInput: $createShoppingCartInput) {
      _id
      products {
        idProduct

        priceProduct

        quantity

        total
      }
      total
      totalItems
      delited
    }
  }
`;
export const deleteProductCart = gql`
  mutation remove($id: String!) {
    remove(id: $id) {
      _id
      products {
        idProduct

        priceProduct

        quantity

        total
      }
      total
      totalItems
      delited
    }
  }
`;
