import { gql } from '@apollo/client';

export const getCategories = gql`
  query categoryRender {
    categoryRender {
      nameCategory
      subcategories
    }
  }
`;

export const getDescount = gql`
  query FindDescountProduct($filter: String!) {
    FindDescountProduct(filter: $filter) {
      _id
      name
      brand {
        name
      }
      NumberReviews
      sellingPrice
      referencePrice
      picture
    }
  }
`;

export const getMoreSale = gql`
  query FindMoreSales {
    FindMoreSales {
      _id
      name
      brand {
        name
      }
      NumberReviews
      sellingPrice
      referencePrice
      picture
    }
  }
`;
