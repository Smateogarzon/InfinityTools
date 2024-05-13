import gql from 'graphql-tag';

export const createProduct = gql`
  mutation createProduct($image: Upload!, $arrayFiles: [Upload!]!) {
    createProduct(image: $image, arrayFiles: $arrayFiles) {
      name
    }
  }
`;
