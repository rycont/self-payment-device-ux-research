import { createStitches } from '@stitches/react'

export const MAIN_ACCENT = '#2EA4AB'

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
      background: '#F9F9F9',
      actionableGray: '#333333',
      dark4: '#ABB0B0',
      dark5: '#D5D7D7',
    },
    shadows: {
      accent: MAIN_ACCENT,
    },
  },
  utils: {
    elevated: () => ({
      boxShadow: '0px 0.5rem 1rem rgba(0, 0, 0, 0.12)',
      border: '2px solid $dark5',
    }),
    animated: () => ({
      transition: '500ms cubic-bezier(0,.67,0,.99)',
    }),
  },
})
