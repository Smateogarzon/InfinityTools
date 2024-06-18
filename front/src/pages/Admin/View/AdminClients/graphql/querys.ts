import { gql } from '@apollo/client';
import { UserInfoAllFragment, UserInfoFragment } from '../../../../../fragments/fragments';

export const getAllClients = gql`
  ${UserInfoAllFragment}
  query FindAllusers($numPage: Int!) {
    FindAllusers(numPage: $numPage) {
      users {
        ...UserAllInfo
      }
      total
    }
  }
`;

export const getUserById = gql`
  ${UserInfoFragment}
  query FindOneuser($id: String!) {
    FindOneuser(id: $id) {
      ...UserInfo
    }
  }
`;
export const userInfoProfile = gql`
  ${UserInfoFragment}
  query FindOneuser {
    FindOneuser {
      ...UserInfo
    }
  }
`;

export const getAllLocations = gql`
  query FindAllLocations {
    AllLocation {
      _id
      city
    }
  }
`;

export const getAllFilters = gql`
  ${UserInfoAllFragment}
  query FindUserQuery($filter: FindUserInput!, $numPage: Int!) {
    FindUserQuery(filter: $filter, numPage: $numPage) {
      users {
        ...UserAllInfo
      }
      total
    }
  }
`;
