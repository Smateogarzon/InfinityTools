import { gql } from '@apollo/client';

export const updateGender = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    UpdateUser(updateUserInput: $updateUserInput) {
      _id
      firtsName
    }
  }
`;
