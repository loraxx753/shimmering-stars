export function formatOrb(orb: number) {
  const degree = Math.floor(Math.abs(orb));
  const minutesFloat = (Math.abs(orb) - degree) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Math.round((minutesFloat - minutes) * 60);
  return { degree, minutes, seconds, float: orb };
}
