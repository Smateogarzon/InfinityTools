import gql from 'graphql-tag';

export const createProduct = gql`
  mutation createProduct($image: Upload!, $arrayFiles: [Upload!]!) {
    createProduct(image: $image, arrayFiles: $arrayFiles) {
      name
    }
  }
`;

export const getAllCategories = gql`
  query allCategories {
    allCategories {
      _id
      name
      subcategory
      products
    }
  }
`;

export const createCategory = gql`
  mutation createCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      name
    }
  }
`;

export const deleteCategories = gql`
  mutation removeCategory($id: String!) {
    removeCategory(id: $id) {
      name
    }
  }
`;

export const getSubCategories = gql`
  query allSubcategories($id: String!) {
    allSubcategories(id: $id) {
      _id
      name
    }
  }
`;

export const createSubCategory = gql`
  mutation createSubCategory($createCategoryInput: CreateCategoryInput!, $id: String!) {
    createSubCategory(createCategoryInput: $createCategoryInput, id: $id) {
      name
    }
  }
`;

export const deleteSubCategories = gql`
  mutation clearSubcategory($id: String!, $categoryId: String!) {
    clearSubcategory(id: $id, categoryId: $categoryId) {
      name
    }
  }
`;

export const getBrands = gql`
  query brands {
    brands {
      _id
      name
    }
  }
`;

export const createBrand = gql`
  mutation createBrand($createBrandInput: CreateBrandInput!) {
    createBrand(createBrandInput: $createBrandInput) {
      name
    }
  }
`;

export const deleteBrands = gql`
  mutation deleteBrand($id: String!) {
    deleteBrand(id: $id) {
      name
    }
  }
`;
