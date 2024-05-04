import { gql } from '@apollo/client';

// Fragment for User Location
export const UserLocationFragment = gql`
  fragment UserLocation on Location {
    tel
    zipCode
    address
    city
    state
  }
`;
// Fragment for User Information
export const UserInfoFragment = gql`
  ${UserLocationFragment}
  fragment UserInfo on User {
    _id
    firtsName
    MiddleName
    lastName
    MiddleLastName
    email
    rol
    location {
      ...UserLocation
    }
    gender
    suscribe
    status
    picture
    date
  }
`;

export const UserInfoAllFragment = gql`
  fragment UserAllInfo on User {
    _id
    firtsName
    rol
    status
    picture
    date
  }
`;
