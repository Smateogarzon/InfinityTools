import { gql } from '@apollo/client';
import { UserInfoAllFragment, UserInfoFragment } from '../../../../../fragments/fragments';

export const getAllClients = gql`
  ${UserInfoAllFragment}
  query FindAllusers {
    FindAllusers {
      ...UserAllInfo
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
  query FindUserQuery($filter: FindUserInput!) {
    FindUserQuery(filter: $filter) {
      ...UserAllInfo
    }
  }
`;
