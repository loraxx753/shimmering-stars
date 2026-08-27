import type { Angles, HouseCusps } from '../types/astrology';

/** 12 ecliptic longitudes, house 1 at index 0. */
export type CuspList = number[];

export function normalizeLongitude(longitude: number): number {
  return ((longitude % 360) + 360) % 360;
}

/**
 * Swiss Ephemeris (via astro-server) returns 12 cusps, house 1 at index 0.
 * Native Swiss Eph C arrays are 1-based with an unused index 0.
 * Accept either shape, plus the 1-based record used in readings.
 */
export function toCuspList(raw: number[] | HouseCusps): CuspList {
  if (Array.isArray(raw)) {
    if (raw.length === 12) return raw.map(Number);
    if (raw.length === 13) return raw.slice(1, 13).map(Number);
    throw new Error(`Expected 12 house cusps, got ${raw.length}`);
  }

  const list = Array.from({ length: 12 }, (_, index) => raw[index + 1]);
  if (list.some((value) => typeof value !== 'number' || Number.isNaN(value))) {
    throw new Error('House cusps 1–12 are required');
  }
  return list;
}

export function toCuspRecord(raw: number[] | HouseCusps): HouseCusps {
  const list = toCuspList(raw);
  return list.reduce<HouseCusps>((acc, longitude, index) => {
    acc[index + 1] = longitude;
    return acc;
  }, {});
}

/**
 * Assign a planet to a house by ecliptic longitude between adjacent cusps.
 * A body exactly on a cusp belongs to that house (the one whose cusp it is).
 */
export function getHouseForPlanet(
  planetLongitude: number,
  houseCusps: number[] | HouseCusps
): number {
  const cusps = toCuspList(houseCusps).map(normalizeLongitude);
  const longitude = normalizeLongitude(planetLongitude);

  for (let i = 0; i < 12; i++) {
    const cuspStart = cusps[i];
    const cuspEnd = cusps[(i + 1) % 12];
    if (cuspStart < cuspEnd) {
      if (longitude >= cuspStart && longitude < cuspEnd) return i + 1;
    } else if (longitude >= cuspStart || longitude < cuspEnd) {
      return i + 1;
    }
  }

  return -1;
}

export function anglesFromHousePositions(housePositions: {
  ascendant: number;
  mc: number;
}): Angles {
  return {
    ascendant: housePositions.ascendant,
    midheaven: housePositions.mc,
    descendant: (housePositions.ascendant + 180) % 360,
    imumCoeli: (housePositions.mc + 180) % 360,
  };
}

export function housesFromApi(housePositions: {
  house: number[];
  ascendant: number;
  mc: number;
}): { angles: Angles; houses: { cusps: HouseCusps; system: string } } {
  return {
    angles: anglesFromHousePositions(housePositions),
    houses: {
      cusps: toCuspRecord(housePositions.house),
      system: 'Placidus',
    },
  };
}
