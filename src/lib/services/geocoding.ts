export interface PopularLocation {
  city: string;
  country: string;
  region?: string;
  lat: number;
  lng: number;
}

export const popularLocations: PopularLocation[] = [
  { city: 'New York', country: 'United States', region: 'New York', lat: 40.7128, lng: -74.0060 },
  { city: 'Los Angeles', country: 'United States', region: 'California', lat: 34.0522, lng: -118.2437 },
  { city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
  { city: 'Toronto', country: 'Canada', region: 'Ontario', lat: 43.6532, lng: -79.3832 },
  { city: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050 },
];
