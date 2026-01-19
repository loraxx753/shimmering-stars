import { gql } from '@apollo/client'

export const PLANETARY_POSITIONS_QUERY = gql`
query getPlanetaryPositions($uid: String!, $name: String, $date: String, $time: String, $latitude: Float, $longitude: Float) {
  planetaryPositions(uid: $uid, name: $name, date: $date, time: $time, latitude: $latitude, longitude: $longitude) {
    name
    longitude
    latitude
    ra
    dec
    dateStr
    northNodeLongitude
    southNodeLongitude
  }
}
`;

export const EXISTING_CHART_QUERY = gql`query ExistingChart($uid: String!) {
  birthChart(uid: $uid) {
    uid
    name
    birthDate
    birthTime
    location {
      latitude
      longitude
      city
      country
      state
    }
    chartData
  }
}
`;

export const HOUSES_QUERY = gql`query HousePositions($uid: String!, $date: String!, $time: String!, $latitude: Float!, $longitude: Float!) {
  housePositions(uid: $uid, date: $date, time: $time, latitude: $latitude, longitude: $longitude) {
    house
    ascendant
    mc
    armc
    vertex
    equatorialAscendant
    kochCoAscendant
    munkaseyCoAscendant
    munkaseyPolarAscendant
  }
}
`;