/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from '..';

describe('<Button />', () => {
  describe('variant', () => {
    const variants = [
      ['default', 'bg-primary text-primary-foreground shadow-moon hover:bg-primary/90 hover:-translate-y-0.5'],
      ['moon', 'bg-gradient-to-r from-[#c03072] via-[#9b3aa3] to-[#6a4bd1] text-white shadow-moon hover:-translate-y-0.5 hover:brightness-110'],
      ['destructive', 'bg-destructive text-destructive-foreground hover:bg-destructive/90'],
      ['outline', 'border border-primary/30 bg-white/80 text-primary hover:border-primary/60 hover:bg-accent'],
      ['secondary', 'bg-secondary text-secondary-foreground hover:bg-secondary/80'],
      ['ghost', 'hover:bg-accent hover:text-accent-foreground'],
      ['link', 'text-primary underline-offset-4 hover:underline'],
      ['expandIcon', 'group relative text-primary-foreground bg-primary hover:bg-primary/90'],
      ['ringHover', 'bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2'],
      ['shine', 'text-primary-foreground animate-shine bg-gradient-to-r from-primary via-primary/75 to-primary bg-[length:400%_100%]'],
      ['gooeyRight', 'text-primary-foreground relative bg-primary z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r from-zinc-400 before:transition-transform before:duration-1000 hover:before:translate-x-[0%] hover:before:translate-y-[0%]'],
      ['gooeyLeft', 'text-primary-foreground relative bg-primary z-0 overflow-hidden transition-all duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l from-zinc-400 after:transition-transform after:duration-1000 hover:after:translate-x-[0%] hover:after:translate-y-[0%]'],
      ['linkHover1', 'relative after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-left after:scale-x-100 hover:after:origin-bottom-right hover:after:scale-x-0 after:transition-transform after:ease-in-out after:duration-300'],
      ['linkHover2', 'relative after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300'],
    ] as const;

    test.each(variants)('%s', (variant, className) => {
      const id = `button-variant-${variant}`;
      render(<Button variant={variant} data-testid={id} />);
      expect(screen.getByTestId(id)).toHaveClass(className);
    });
  });

  describe('size', () => {
    const sizes = [
      ['default', 'h-11 px-5'],
      ['sm', 'h-9 px-4'],
      ['lg', 'h-12 px-8 text-base'],
      ['icon', 'h-11 w-11'],
    ] as const;

    test.each(sizes)('%s', (size, className) => {
      const id = `button-size-${size}`;
      render(<Button size={size} data-testid={id} />);
      expect(screen.getByTestId(id)).toHaveClass(className);
    });
  });
});
