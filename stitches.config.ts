import { createStitches } from '@stitches/react';

export const MAIN_ACCENT = "#2EA4AB"

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      accent: MAIN_ACCENT,
      background: "#F9F9F9",
      actionableGray: "#333333"
    },
  }
});
