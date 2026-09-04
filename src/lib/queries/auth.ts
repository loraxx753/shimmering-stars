import { gql } from "@apollo/client";

export const AUTH_URL_QUERY = gql`
  query AuthUrl($provider: AuthProvider!) {
    authUrl(provider: $provider) {
      url
      state
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
      avatarUrl
      provider
    }
  }
`;

export const EXCHANGE_OAUTH_CODE_MUTATION = gql`
  mutation ExchangeOAuthCode($code: String!, $state: String!) {
    exchangeOAuthCode(code: $code, state: $state) {
      token
      user {
        id
        email
        name
        avatarUrl
        provider
      }
    }
  }
`;
