import React, { useMemo } from 'react';
import type { Reading } from '@/lib/types/astrology';
import { bodySymbols } from '@/lib/data/constants';
import { bodyTypes } from '@/lib/utils';
import { convertToZodiac } from '@/lib/services/calculate/astrology';
import { normalizeLongitude, toCuspList } from '@/lib/services/housePlacement';

const SIZE = 640;
const C = SIZE / 2;
const R_OUTER = 310;
const R_ZODIAC = 266;
const R_GLYPH = 240;
const R_DEGREE = 213;
const R_SIGN = 194;
const R_MINUTE = 175;
const R_HOUSE_OUTER = 150;
const R_HOUSE_INNER = 126;
const MIN_LABEL_SEPARATION = 10;
const HALO = { stroke: 'white', strokeWidth: 3, paintOrder: 'stroke', strokeLinejoin: 'round' } as const;

// U+FE0E forces text presentation so glyphs don't render as color emoji.
const TEXT = '\uFE0E';
const SYMBOL_FONT = "'Apple Symbols', 'Segoe UI Symbol', 'Noto Sans Symbols 2', 'Noto Sans Symbols', 'DejaVu Sans', sans-serif";

const SIGNS = [
  { name: 'Aries', glyph: '♈' },
  { name: 'Taurus', glyph: '♉' },
  { name: 'Gemini', glyph: '♊' },
  { name: 'Cancer', glyph: '♋' },
  { name: 'Leo', glyph: '♌' },
  { name: 'Virgo', glyph: '♍' },
  { name: 'Libra', glyph: '♎' },
  { name: 'Scorpio', glyph: '♏' },
  { name: 'Sagittarius', glyph: '♐' },
  { name: 'Capricorn', glyph: '♑' },
  { name: 'Aquarius', glyph: '♒' },
  { name: 'Pisces', glyph: '♓' },
];

const signFill = (index: number) => `hsl(${index * 30} 85% 92%)`;
const signInk = (index: number) => `hsl(${index * 30} 55% 38%)`;

const ASPECT_STYLES: Record<string, { stroke: string; dash?: string }> = {
  Opposition: { stroke: 'hsl(345 70% 50%)' },
  Square: { stroke: 'hsl(345 70% 50%)' },
  Trine: { stroke: 'hsl(220 70% 52%)' },
  Sextile: { stroke: 'hsl(220 70% 52%)', dash: '5 4' },
};

const ANGLE_LABELS = [
  { key: 'ascendant', label: 'AC', title: 'Ascendant' },
  { key: 'imumCoeli', label: 'IC', title: 'Imum Coeli' },
  { key: 'descendant', label: 'DC', title: 'Descendant' },
  { key: 'midheaven', label: 'MC', title: 'Midheaven' },
] as const;

type WheelBody = {
  key: string;
  title: string;
  glyph: string;
  longitude: number;
  isAngle?: boolean;
};

/**
 * Pushes overlapping labels apart so each is at least `minSeparation` degrees
 * from its neighbors, preserving their order around the circle.
 */
function spreadLongitudes(longitudes: number[], minSeparation: number): number[] {
  const n = longitudes.length;
  if (n < 2) return [...longitudes];
  const separation = Math.min(minSeparation, 360 / n);
  const order = longitudes
    .map((_, i) => i)
    .sort((a, b) => normalizeLongitude(longitudes[a]) - normalizeLongitude(longitudes[b]));
  const positions = order.map((i) => normalizeLongitude(longitudes[i]));

  for (let iteration = 0; iteration < 300; iteration++) {
    let moved = false;
    for (let k = 0; k < n; k++) {
      const next = (k + 1) % n;
      const gap = positions[next] + (next === 0 ? 360 : 0) - positions[k];
      if (gap < separation - 1e-6) {
        const push = (separation - gap) / 2;
        positions[k] -= push;
        positions[next] += push;
        moved = true;
      }
    }
    if (!moved) break;
  }

  const result = new Array<number>(n);
  order.forEach((originalIndex, sortedIndex) => {
    result[originalIndex] = positions[sortedIndex];
  });
  return result;
}

function formatPosition(longitude: number) {
  const z = convertToZodiac(longitude);
  return `${z.sign} ${z.degree}°${String(z.minutes).padStart(2, '0')}'`;
}

const NatalChartWheel: React.FC<{ reading: Reading }> = ({ reading }) => {
  const ascendant = reading.angles?.ascendant ?? 0;

  /** Ascendant sits at 9 o'clock; the zodiac runs counterclockwise from there. */
  const point = (longitude: number, radius: number) => {
    const theta = ((180 + longitude - ascendant) * Math.PI) / 180;
    return { x: C + radius * Math.cos(theta), y: C - radius * Math.sin(theta) };
  };

  const arcPath = (startLon: number, endLon: number, outer: number, inner: number) => {
    const o1 = point(startLon, outer);
    const o2 = point(endLon, outer);
    const i2 = point(endLon, inner);
    const i1 = point(startLon, inner);
    return [
      `M ${o1.x} ${o1.y}`,
      `A ${outer} ${outer} 0 0 0 ${o2.x} ${o2.y}`,
      `L ${i2.x} ${i2.y}`,
      `A ${inner} ${inner} 0 0 1 ${i1.x} ${i1.y}`,
      'Z',
    ].join(' ');
  };

  const cusps = useMemo(() => {
    if (!reading.houses?.cusps) return null;
    try {
      return toCuspList(reading.houses.cusps).map(normalizeLongitude);
    } catch {
      return null;
    }
  }, [reading.houses]);

  const bodies = useMemo<WheelBody[]>(() => {
    const list: WheelBody[] = reading.positions
      .filter((p) => bodySymbols[p.name])
      .map((p) => ({ key: p.name, title: p.name, glyph: bodySymbols[p.name], longitude: p.longitude }));
    const has = (key: string) => list.some((b) => b.key === key);
    if (reading.northNode !== undefined && !has('NorthNode')) {
      list.push({ key: 'NorthNode', title: 'North Node', glyph: bodySymbols.NorthNode, longitude: reading.northNode });
    }
    if (reading.southNode !== undefined && !has('SouthNode')) {
      list.push({ key: 'SouthNode', title: 'South Node', glyph: bodySymbols.SouthNode, longitude: reading.southNode });
    }
    if (reading.angles) {
      ANGLE_LABELS.forEach(({ key, label, title }) => {
        list.push({ key, title, glyph: label, longitude: reading.angles![key], isAngle: true });
      });
    }
    return list;
  }, [reading.positions, reading.northNode, reading.southNode, reading.angles]);

  const displayLongitudes = useMemo(
    () => spreadLongitudes(bodies.map((b) => b.longitude), MIN_LABEL_SEPARATION),
    [bodies]
  );

  const aspectLines = useMemo(() => {
    const byName = new Map(reading.positions.map((p) => [p.name, p.longitude]));
    return (reading.aspects ?? []).filter(
      (a) =>
        ASPECT_STYLES[a.aspect] &&
        bodyTypes.planets.includes(a.planetA) &&
        bodyTypes.planets.includes(a.planetB) &&
        byName.has(a.planetA) &&
        byName.has(a.planetB)
    ).map((a) => ({ ...a, lonA: byName.get(a.planetA)!, lonB: byName.get(a.planetB)! }));
  }, [reading.aspects, reading.positions]);

  const ticks = useMemo(() => Array.from({ length: 360 }, (_, d) => d), []);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="mx-auto block h-auto w-full max-w-[640px] select-none"
      role="img"
      aria-label="Natal chart wheel"
    >
      <circle cx={C} cy={C} r={R_OUTER} fill="white" stroke="hsl(270 30% 60%)" strokeWidth={1.5} />

      {SIGNS.map((sign, i) => {
        const start = i * 30;
        const mid = point(start + 15, (R_OUTER + R_ZODIAC) / 2);
        return (
          <g key={sign.name}>
            <title>{sign.name}</title>
            <path d={arcPath(start, start + 30, R_OUTER, R_ZODIAC)} fill={signFill(i)} stroke="hsl(270 30% 60%)" strokeWidth={1} />
            <text
              x={mid.x}
              y={mid.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={24}
              fill={signInk(i)}
              fontFamily={SYMBOL_FONT}
            >
              {sign.glyph + TEXT}
            </text>
          </g>
        );
      })}

      <circle cx={C} cy={C} r={R_ZODIAC} fill="white" stroke="hsl(270 30% 60%)" strokeWidth={1} />

      {ticks.map((d) => {
        const length = d % 10 === 0 ? 10 : d % 5 === 0 ? 7 : 3.5;
        const a = point(d, R_ZODIAC);
        const b = point(d, R_ZODIAC - length);
        return <line key={d} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="hsl(270 20% 55%)" strokeWidth={d % 5 === 0 ? 1 : 0.6} />;
      })}

      {cusps && cusps.map((cusp, i) => {
        const isAxis = i % 3 === 0;
        const outer = point(cusp, isAxis ? R_OUTER : R_ZODIAC);
        const inner = point(cusp, R_HOUSE_INNER);
        return (
          <line
            key={`cusp-${i}`}
            x1={outer.x}
            y1={outer.y}
            x2={inner.x}
            y2={inner.y}
            stroke={isAxis ? 'hsl(334 60% 40%)' : 'hsl(270 15% 70%)'}
            strokeWidth={isAxis ? 2 : 0.8}
          />
        );
      })}

      <circle cx={C} cy={C} r={R_HOUSE_OUTER} fill="hsl(330 100% 97%)" stroke="hsl(334 50% 75%)" strokeWidth={1} />
      <circle cx={C} cy={C} r={R_HOUSE_INNER} fill="white" stroke="hsl(334 50% 75%)" strokeWidth={1} />

      {cusps && cusps.map((cusp, i) => {
        const next = cusps[(i + 1) % 12];
        const span = normalizeLongitude(next - cusp);
        const a = point(cusp, R_HOUSE_OUTER);
        const b = point(cusp, R_HOUSE_INNER);
        const label = point(cusp + span / 2, (R_HOUSE_OUTER + R_HOUSE_INNER) / 2);
        return (
          <g key={`house-${i}`}>
            <title>{`House ${i + 1}: ${formatPosition(cusp)}`}</title>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="hsl(334 50% 75%)" strokeWidth={1} />
            <text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700} fill="hsl(334 45% 40%)">
              {i + 1}
            </text>
          </g>
        );
      })}

      {aspectLines.map((a, i) => {
        const p1 = point(a.lonA, R_HOUSE_INNER);
        const p2 = point(a.lonB, R_HOUSE_INNER);
        const style = ASPECT_STYLES[a.aspect];
        return (
          <line
            key={`aspect-${i}`}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={style.stroke}
            strokeWidth={1.1}
            strokeDasharray={style.dash}
            strokeOpacity={0.75}
          >
            <title>{`${a.planetA} ${a.aspect.toLowerCase()} ${a.planetB}`}</title>
          </line>
        );
      })}

      {bodies.map((body, i) => {
        const z = convertToZodiac(body.longitude);
        const signIndex = SIGNS.findIndex((s) => s.name === z.sign);
        const shown = displayLongitudes[i];
        const exactOuter = point(body.longitude, R_ZODIAC);
        const exactInner = point(body.longitude, R_ZODIAC - 12);
        const leaderEnd = point(shown, R_GLYPH + 14);
        const glyph = point(shown, R_GLYPH);
        const degree = point(shown, R_DEGREE);
        const sign = point(shown, R_SIGN);
        const minute = point(shown, R_MINUTE);
        const marker = point(body.longitude, R_HOUSE_INNER);
        const ink = body.isAngle ? 'hsl(334 60% 35%)' : 'hsl(265 45% 28%)';
        return (
          <g key={body.key}>
            <title>{`${body.title}: ${formatPosition(body.longitude)}`}</title>
            <line x1={exactOuter.x} y1={exactOuter.y} x2={exactInner.x} y2={exactInner.y} stroke={ink} strokeWidth={1.5} />
            <line x1={exactInner.x} y1={exactInner.y} x2={leaderEnd.x} y2={leaderEnd.y} stroke={ink} strokeWidth={0.5} strokeOpacity={0.5} />
            {!body.isAngle && <circle cx={marker.x} cy={marker.y} r={2} fill={ink} />}
            <g {...HALO}>
              <text
                x={glyph.x}
                y={glyph.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={body.isAngle ? 15 : 22}
                fontWeight={body.isAngle ? 800 : 400}
                fill={ink}
                fontFamily={body.isAngle ? undefined : SYMBOL_FONT}
              >
                {body.isAngle ? body.glyph : body.glyph + TEXT}
              </text>
              <text x={degree.x} y={degree.y} textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700} fill="hsl(265 30% 30%)">
                {`${z.degree}°`}
              </text>
              <text
                x={sign.x}
                y={sign.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={13}
                fill={signIndex >= 0 ? signInk(signIndex) : ink}
                fontFamily={SYMBOL_FONT}
              >
                {signIndex >= 0 ? SIGNS[signIndex].glyph + TEXT : ''}
              </text>
              <text x={minute.x} y={minute.y} textAnchor="middle" dominantBaseline="central" fontSize={10} fill="hsl(265 20% 45%)">
                {`${String(z.minutes).padStart(2, '0')}'`}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
};

export default NatalChartWheel;
