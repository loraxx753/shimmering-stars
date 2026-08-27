export const convertToZodiac = (degrees: number) => {
  const signs = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];
  const d = ((degrees % 360) + 360) % 360;
  const signIndex = Math.floor(d / 30);
  const sign = signs[signIndex];
  const degree = Math.floor(d % 30);
  const minutes = Math.floor((d % 1) * 60);
  const seconds = Math.round((((d % 1) * 60) - minutes) * 60);
  return { sign, degree, minutes, seconds };
};

export function toDMS(value: number, type: "lat" | "long"): string {
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = Math.round((minFloat - min) * 60);
  let dir = "";
  if (type === "lat") dir = value >= 0 ? "N" : "S";
  if (type === "long") dir = value >= 0 ? "E" : "W";
  return `${deg}°${min}'${sec}" ${dir}`;
}
