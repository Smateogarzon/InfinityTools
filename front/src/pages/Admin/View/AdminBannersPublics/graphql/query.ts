import gql from 'graphql-tag';

export const CreateBanners = gql`
  mutation createBanner($createBannerInput: CreateBannerInput!, $image: Upload!) {
    createBanner(createBannerInput: $createBannerInput, image: $image) {
      name
      picture
      label
    }
  }
`;

export const updateBanner = gql`
  mutation updateBanner($updateBannerInput: CreateBannerInput!) {
    updateBanner(updateBannerInput: $updateBannerInput) {
      name
      picture
      label
    }
  }
`;
export const deleteBanner = gql`
  mutation removeBanner($updateBannerInput: CreateBannerInput!) {
    removeBanner(updateBannerInput: $updateBannerInput) {
      name
    }
  }
`;
export const deleteBData = gql`
  mutation deleteBanner($updateBannerInput: CreateBannerInput!) {
    deleteBanner(updateBannerInput: $updateBannerInput) {
      name
    }
  }
`;
export const getBanners = gql`
  query Allbanners {
    Allbanners {
      _id
      name
      picture
      label
    }
  }
`;

export const findImg = gql`
  query bannerIMG($search: String!) {
    bannerIMG(search: $search) {
      picture
      name
    }
  }
`;
