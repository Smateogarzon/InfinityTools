import gql from 'graphql-tag';

export const getProducts = gql`
  query allProducts {
    allProducts {
      _id
      name
      picture
      sellingPrice
      referencePrice
      category {
        name
      }
      status
    }
  }
`;
export const getProductById = gql`
  query FindOneproduct($id: String!) {
    FindOneproduct(id: $id) {
      _id
      name
      description
      purchasePrice
      sellingPrice
      referencePrice
      category {
        _id
        name
      }
      subcategory {
        _id
        name
      }
      picture
      extraPicture
      brand {
        _id
        name
      }
      reviews
      salesNumber
      status
    }
  }
`;

export const updateProduct = gql`
  mutation updateProduct(
    $image: Upload
    $arrayFiles: [Upload]
    $updateProductInput: UpdateProductInput
  ) {
    updateProduct(image: $image, arrayFiles: $arrayFiles, updateProductInput: $updateProduct) {
      name
    }
  }
`;
export const createProduct = gql`
  mutation createProduct(
    $image: Upload!
    $arrayFiles: [Upload!]!
    $createProductInput: CreateProductInput!
  ) {
    createProduct(image: $image, arrayFiles: $arrayFiles, createProductInput: $createProductInput) {
      name
    }
  }
`;

export const updateStatus = gql`
  mutation updateProductStatus($updateProductStatusInput: UpdateProductInput!) {
    updateProductStatus(updateProductStatusInput: $updateProductStatusInput) {
      status
    }
  }
`;
export const delProduct = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id) {
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
