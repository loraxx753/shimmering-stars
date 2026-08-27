import {
  getHouseForPlanet,
  housesFromApi,
  toCuspList,
  toCuspRecord,
} from './housePlacement';

/**
 * Kevin Baugh test chart: 1984-08-18 08:03, 28.078611N 80.602778W.
 * Cusps from Swiss Ephemeris Placidus (astro-server housePositions).
 */
const KEVIN_HOUSES = {
  house: [
    159.86786995637823, // 1 ASC Virgo 9°52'
    186.77886970714005, // 2 Libra 6°46'
    217.0038698781403,  // 3 Scorpio 7°00'
    248.89319810665089, // 4 IC Sagittarius 8°53'
    280.6178256401615,  // 5 Capricorn 10°37'
    311.15307218616176, // 6 Aquarius 11°09'
    339.86786995637823, // 7 DSC Pisces 9°52'
    6.778869707140048,  // 8 Aries 6°46'
    37.0038698781403,   // 9 Taurus 7°00'
    68.89319810665089,  // 10 MC Gemini 8°53'
    100.6178256401615,  // 11 Cancer 10°37'
    131.15307218616176, // 12 Leo 11°09'
  ],
  ascendant: 159.86786995637823,
  mc: 68.89319810665089,
};

const KEVIN_RECORD = toCuspRecord(KEVIN_HOUSES.house);

describe('toCuspList', () => {
  test('keeps a 12-length Swiss Eph JS array', () => {
    expect(toCuspList(KEVIN_HOUSES.house)).toHaveLength(12);
    expect(toCuspList(KEVIN_HOUSES.house)[0]).toBeCloseTo(KEVIN_HOUSES.ascendant);
  });

  test('drops unused index 0 from a native 13-length C array', () => {
    const native = [0, ...KEVIN_HOUSES.house];
    expect(toCuspList(native)).toEqual(KEVIN_HOUSES.house);
  });

  test('reads a 1-based cusp record', () => {
    expect(toCuspList(KEVIN_RECORD)[0]).toBeCloseTo(KEVIN_HOUSES.house[0]);
    expect(toCuspList(KEVIN_RECORD)[9]).toBeCloseTo(KEVIN_HOUSES.mc);
  });
});

describe('getHouseForPlanet', () => {
  test('puts a body just after the Ascendant in house 1, not house 2', () => {
    expect(getHouseForPlanet(KEVIN_HOUSES.ascendant + 0.1, KEVIN_RECORD)).toBe(1);
    expect(getHouseForPlanet(KEVIN_HOUSES.ascendant + 0.1, KEVIN_HOUSES.house)).toBe(1);
  });

  test('puts a body just before the Ascendant in house 12', () => {
    expect(getHouseForPlanet(KEVIN_HOUSES.ascendant - 0.1, KEVIN_RECORD)).toBe(12);
  });

  test('puts a body on the Ascendant in house 1', () => {
    expect(getHouseForPlanet(KEVIN_HOUSES.ascendant, KEVIN_RECORD)).toBe(1);
  });

  test('puts a body just after the MC in house 10', () => {
    expect(getHouseForPlanet(KEVIN_HOUSES.mc + 0.1, KEVIN_RECORD)).toBe(10);
  });

  test('assigns wraparound longitudes (0° Aries) to house 7', () => {
    expect(getHouseForPlanet(0, KEVIN_RECORD)).toBe(7);
  });

  test('assigns 0° Virgo to house 12', () => {
    expect(getHouseForPlanet(150, KEVIN_RECORD)).toBe(12);
  });

  test('does not treat a 1-based record as a 0-based array', () => {
    // The previous hook passed `{1: h1, ...}` into a loop over indices 0–11,
    // which shifted every planet forward by one house (often into house 1).
    const broken = (planetLon: number, houseCusps: Record<number, number>) => {
      for (let i = 0; i < 12; i++) {
        const cuspStart = houseCusps[i];
        const cuspEnd = houseCusps[(i + 1) % 12];
        if (cuspStart < cuspEnd) {
          if (planetLon >= cuspStart && planetLon < cuspEnd) return i + 1;
        } else if (planetLon >= cuspStart || planetLon < cuspEnd) {
          return i + 1;
        }
      }
      return -1;
    };

    expect(broken(KEVIN_HOUSES.ascendant + 0.1, KEVIN_RECORD)).toBe(2);
    expect(getHouseForPlanet(KEVIN_HOUSES.ascendant + 0.1, KEVIN_RECORD)).toBe(1);
  });
});

describe('housesFromApi', () => {
  test('builds a 1-based cusp record and derived angles', () => {
    const { angles, houses } = housesFromApi(KEVIN_HOUSES);
    expect(Object.keys(houses.cusps)).toHaveLength(12);
    expect(houses.cusps[1]).toBeCloseTo(KEVIN_HOUSES.ascendant);
    expect(houses.cusps[10]).toBeCloseTo(KEVIN_HOUSES.mc);
    expect(houses.system).toBe('Placidus');
    expect(angles.ascendant).toBeCloseTo(KEVIN_HOUSES.ascendant);
    expect(angles.midheaven).toBeCloseTo(KEVIN_HOUSES.mc);
    expect(angles.descendant).toBeCloseTo((KEVIN_HOUSES.ascendant + 180) % 360);
  });
});
