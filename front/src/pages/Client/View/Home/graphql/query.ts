import { gql } from '@apollo/client';

export const getCategories = gql`
  query categoryRender {
    categoryRender {
      nameCategory
      subcategories
    }
  }
`;
