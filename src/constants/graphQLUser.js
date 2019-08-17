import gql from 'graphql-tag';

export const GET_USERS = gql`
  {
    users {
      id
      firstName
      lastName
      email
      username
      password
      provider
      emailConfirmed
      profileData
      additionalProvidersData
      resetPasswordToken
      resetPasswordExpires
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_BY_ID = gql`
  {
    user(id: 1) {
      id
      firstName
      lastName
      email
      username
      password
      provider
      emailConfirmed
      profileData
      additionalProvidersData
      resetPasswordToken
      resetPasswordExpires
      createdAt
      updatedAt
    }
  }
`;
