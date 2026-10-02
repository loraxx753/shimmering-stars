import { useEffect } from 'react';

/**
 * Custom hook to set a dynamic page background using CSS variables
 * @param background - CSS background value (gradient, color, etc.)
 */
export const usePageBackground = (background: string) => {
  useEffect(() => {
    document.documentElement.style.setProperty('--page-background', background);
    
    return () => {
      // Fall back to the stylesheet's default sky when the page unmounts
      document.documentElement.style.removeProperty('--page-background');
    };
  }, [background]);
};

// Predefined backgrounds; the element variants nod to each sign's guardian palette.
export const pageBackgrounds = {
  astrology: 'linear-gradient(170deg, #1d1645 0%, #3b2a7a 40%, #8a4fb0 75%, #e98ac4 100%)', // Twilight
  zodiac: 'linear-gradient(170deg, #fff4fb 0%, #f1e8ff 45%, #e4f2ff 100%)', // Pastel dawn
  cosmic: 'linear-gradient(180deg, #140f33 0%, #2a1f5c 35%, #5b3a9e 70%, #d779b5 100%)', // Moonlit night
  fire: 'linear-gradient(170deg, #2b0b24 0%, #8f1d4a 50%, #ff7a7a 100%)', // Mars red
  earth: 'linear-gradient(170deg, #0f2a26 0%, #24745a 55%, #9fe0a6 100%)', // Jupiter green
  air: 'linear-gradient(170deg, #11234a 0%, #2a76b8 55%, #9fe3ff 100%)', // Mercury blue
  water: 'linear-gradient(170deg, #0b1a45 0%, #2a4bb0 55%, #8fb8ff 100%)', // Neptune sea
  default: 'transparent'
} as const;
