/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    `app/**/*.{js,ts,jsx,tsx}`,
    `components/**/*.{js,ts,jsx,tsx}`,
    `sections/**/*.{js,ts,jsx,tsx}`,
    `src/**/*.{js,ts,jsx,tsx}`,
    '../../packages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
        logo: ['var(--font-monoton)'],
      },
      gap: {
        sm: defaultTheme.spacing[4],
        md: defaultTheme.spacing[10],
        lg: defaultTheme.spacing[24],
      },

      padding: {
        sm: defaultTheme.spacing[4],
        md: defaultTheme.spacing[8],
        lg: defaultTheme.spacing[24],
      },
      colors: {
        dark: {
          primary: colors.teal[300],
          background: {
            primary: colors.zinc[800],
            contrast: colors.zinc[700],
          },
          typography: {
            primary: colors.zinc[50],
            contrast: colors.zinc[300],
          },
        },
        light: {
          primary: colors.teal[500],
          background: {
            primary: colors.zinc[50],
            contrast: colors.zinc[200],
          },
          typography: {
            primary: colors.zinc[800],
            contrast: colors.zinc[500],
          },
        },
        utility: {
          error: colors.red[500],
          warning: colors.yellow[500],
          info: colors.blue[500],
          success: colors.green[500],
        },
      },

      keyframes: {
        'content-show': {
          from: {
            transform: 'translateX(-100px)',
          },
          to: {
            transform: 'translateX(0px)',
          },
        },
        'overlay-show': {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        'slide-down': {
          from: {
            height: 0,
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'slide-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: 0,
          },
        },
      },
      animation: {
        'overlay-show': 'overlay-show 50ms linear ',
        'content-show': 'content-show 100ms linear ',
        'slide-down': 'slide-down 100ms cubic-bezier(0.87, 0, 0.13, 1)',
        'slide-up': 'slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },

  plugins: [
    require('cssnano'),
    require('autoprefixer'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
};
