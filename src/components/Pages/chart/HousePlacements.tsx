import React from 'react';
import { Reading } from '@/lib/types/astrology';
import { convertToZodiac } from '@/lib/services/calculate/astrology';
import { signEmojis } from '@/lib/data/constants';
import { ordinal } from '@/lib/utils';


const HousePlacements: React.FC<{ reading: Reading }> = ({ reading }) => {
    if (!reading?.houses?.cusps) return null;
    return (
        <ul className="text-sm text-indigo-700 space-y-1">
            {Array.from({ length: 12 }, (_, index) => {
                const houseNum = index + 1;
                const rawCusp = reading.houses!.cusps[houseNum];
                const cusp = convertToZodiac(rawCusp);
                return (
                <li key={houseNum} className="flex items-center gap-2">
                    <a href={`https://masteringthezodiac.com/${ordinal(houseNum)}-house-in-astrology`} target='_blank'>
                        <span className="text-lg font-bold">{houseNum}</span>
                    </a>
                    &nbsp;
                    <a href={`https://masteringthezodiac.com/${cusp.sign.toLowerCase()}-in-${ordinal(houseNum)}-house`} target='_blank'>
                        <span className="text-lg" title={cusp.sign}>{signEmojis[cusp.sign] || ''}</span> <span className="text-sm text-gray-500 ml-1 ">{cusp.sign}</span> {cusp.degree}° {cusp.minutes}' {cusp.seconds}
                    </a>
                </li>
                )
            })}
        </ul>
    );
};

export default HousePlacements;