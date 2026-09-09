import { gql } from "@apollo/client";

export const CLIENT_CHART_FIELDS = gql`
  fragment ClientChartFields on ClientChart {
    id
    name
    birthDate
    birthTime
    location {
      city
      country
      state
      latitude
      longitude
      timezone
    }
    houseSystem
    gender
    notes
    createdAt
  }
`;

export const BIRTH_CHARTS_QUERY = gql`
  ${CLIENT_CHART_FIELDS}
  query BirthCharts {
    birthCharts {
      ...ClientChartFields
    }
  }
`;

export const CREATE_CLIENT_CHART_MUTATION = gql`
  ${CLIENT_CHART_FIELDS}
  mutation CreateClientChart(
    $name: String!
    $birthDate: String!
    $birthTime: String!
    $location: LocationInput!
    $houseSystem: String
    $gender: String
    $notes: String
  ) {
    createClientChart(
      name: $name
      birthDate: $birthDate
      birthTime: $birthTime
      location: $location
      houseSystem: $houseSystem
      gender: $gender
      notes: $notes
    ) {
      ...ClientChartFields
    }
  }
`;

export const DELETE_CLIENT_CHART_MUTATION = gql`
  ${CLIENT_CHART_FIELDS}
  mutation DeleteClientChart($id: ID!) {
    deleteClientChart(id: $id) {
      ...ClientChartFields
    }
  }
`;
