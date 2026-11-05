// Soft light tints matching the editorial design system
export const PALETTE = [
  '#E9E8E3', // sand
  '#E3E7EB', // slate
  '#E4E9E3', // sage
  '#EDE7E2', // clay
  '#E7E5EC', // lilac
] as const;

export type PaletteColor = typeof PALETTE[number];

export function getPaletteColor(index: number): PaletteColor {
  return PALETTE[index % PALETTE.length];
}
