/* eslint-disable sort-keys-fix/sort-keys-fix */

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#797979',
          800: '#545454',
          700: '#7C7C7C',
          600: '#7D7C88',
          500: '#6D6D6D',
          400: '#141414',
          300: '#272727',
          100: '#151515',
          50: '#A4A4A4',
        },
        violet: {
          100: '#9C40CF',
          200: '#522294',
        },
        red: {
          800: '#F84E55',
          700: '#F55065',
          600: '#D64D54',
        },
        blue: {
          100: '#3461D4',
        },
        zinc: {
          800: '#20133D',
          700: '#29123E',
          500: '#3C2D50',
          400: '#818181',
          300: '#E4E4F4',
          200: '#EBEDFO',
          100: '#FBF8FB',
        }
      },
      fontSize: {
        '2xs': '.625rem', // 10px
        '6xl': ['4rem', {
          lineHeight: '2',
        }],
      },
      fontFamily: {
        poppins: 'Poppins',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
