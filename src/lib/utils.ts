import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export const bodyTypes = {
    planets: ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"],
    asteroids: ['Ceres', 'Pallas', 'Juno', 'Vesta'],
    nodes: ['North Node', 'South Node'],
    other: ['Chiron', 'Lilith'],
};

export function resolveAspectGrammar(aspect: string): string {
    switch(aspect) {
        case 'conjunction':
            return 'conjunct';
        case 'opposition':
            return 'opposite';
        default:
            return aspect;
    }
}
