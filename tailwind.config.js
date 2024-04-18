/* eslint-disable sort-keys */
/**
 * Dont add if size is smaller than 10px.
 * Dont use `em` or `rem`. Use correct `px` instead.
 */
const sizes = {
  26: '26px',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.{html,js,jsx,ts,tsx}',
    './src/**/*.{html,js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  darkMode: 'class', // 'media' is the default, change to 'class' if you want to use dark mode in with class names
  theme: {
    screens: {
      xs: '321px',
      sm: '390px',
      smd: '480px',
      md: '650px',
      lmd: '768px',
      slg: '980px',
      lg: '1024px',
      xlg: '1200px',
      xl: '1400px',
      xxl: '1920px'
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
    fontSize: {
      sm: ['0.8125rem', '1.25rem'],
      base: ['0.9375rem', '1.375rem'],
      lg: ['1.125rem', '1.5rem'],
      xl: ['1.375rem', '1.75rem'],
      '2xl': ['1.625rem', '2rem'],
      '3xl': ['1.75rem', '2rem'],
      '4xl': ['2.5rem', '2.875rem'],
    },

    lineHeight: {
      h1: '90%',
      h2: '90%',
      h3: '90%',
      h4: '90%',
      h5: '80%',
      subtitle: '120%',
      paragraph: '140%',
      body: '140%',
      caption: '120%',
      small: '120%',
      sm: '150%',
      md: '150%',
      lg: '150%',
    },
    letterSpacing: {
      h1: '-0.8px',
      h2: '-0.5px',
      h3: '-0.5px',
      h4: '-0.5px',
      subtitle: '-0.2px',
      paragraph: '-0.2px',
      body: '-0.2px',
      caption: '0px',
      small: '0px',
      sm: '0px',
      md: '0px',
      lg: '0px',
    },
    extend: {
      colors: {
        'neutral': {
          100: 'rgb(25, 28, 31)', //custom-black'
          'custom-black': 'rgba(22, 22, 26)',
          200: 'rgba(22, 22, 26, 0.9)',  //custom-black
          300: 'rgba(22, 22, 26, 0.8)', //custom-darkgrey
          400: 'rgba(22, 22, 26, 0.6)', //custom-grey
          500: 'rgba(22, 22, 26, 0.4)', //custom-midgrey
          600: 'rgba(22, 22, 26, 0.2)', //custom-highlight
          1100: 'rgba(22, 22, 26, 0.1)',
          700: 'rgba(22, 22, 26, 0.08)', //custom-semigrey
          800: 'rgba(22, 22, 26, 0.04)', //custom-lightgrey
          1200: 'rgba(22, 22, 26, 0.03)',
          900: 'rgba(22, 22, 26, 0.02)',//light-grey
          1000: 'rgba(0, 0, 0, 0.1)', //toggle-grey
          1300: 'rgba(0, 0, 0, 0.05)', 
        },
        'lilac': 'rgb(238, 238, 255)', //lilac
        'warning': 'rgb(233, 73, 73)',//warnging
        'error': 'rgba(255, 0, 0, 0.5)', //coral
        'success': 'rgba(0, 255, 0, 0.5)', //mint
        'red':{
          50:"rgba(233, 73, 73, 0.1)",
          100:"rgba(233, 73, 73, 1)",
          200:'rgba(239, 118, 118, 0.9)',
        },
        'blue': {
          100: '#1868B7', //custom-dark-blue
          200: '#347AE2', //custom-blue
          300: 'rgb(40, 44, 75)',
        },
        'slate': {
          100: 'rgb(241, 245, 249)',
          200: 'rgb(178, 188, 213)',
          400: 'rgb(148, 163, 184)',
        },
        'neutral-light': {
          100: 'rgb(255, 255, 255,1)',
          1200: 'rgb(255, 255, 255, 0.9)',
          200: 'rgb(255, 255, 255, 0.8)',
          300: 'rgb(255, 255, 255,0.6)', //#FFFFFF99
          400: 'rgb(255, 255, 255,0.4)',
          500: 'rgb(255, 255, 255,0.2)',
          1100: 'rgb(255, 255, 255,0.1)',
          600: 'rgb(255, 255, 255,0.08)',
          700: 'rgb(255, 255, 255,0.06)',
          800: 'rgb(255, 255, 255,0.04)',
          900: 'rgb(255, 255, 255,0.02)',
          1000: 'rgb(255, 255, 255,0.01)', // #ffffff1a
          1300: 'rgb(255, 255, 255,0.15)'
        },
        'custom-light': {
          10: 'rgb(25 28 31)',
          100: 'rgb(25 28 31 / 85%)', // #191c1fd9
          200: 'rgba(34, 37, 39, 1)', // #222527
          300: 'rgb(39, 43, 48)',
          400: 'rgb(241 245 249)', //#f1f5f9
          500: 'rgba(31, 34, 38, 1)',
          600: 'rgba(48, 54, 59, 0.5)',
          700: 'rgb(25 28 31 /30%)',
          800: 'rgba(48, 54, 59)',
          900: 'rgba(31, 34, 38, 0.85)'
        }

      },
      width: sizes,
      height: sizes,
      minWidth: sizes,
      minHeight: sizes,
      maxWidth: sizes,
      maxHeight: sizes,
      borderRadius: {
        'xs': '6px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        '20': '20px',
        'xl': '24px',
        '2xl': '48px',
      },
      boxShadow: theme => ({
        'solid-light-active': `inset 0px 0px 0px 4px ${theme('colors.neutral.100')}`,
        'outlined-light-disabled': `inset 0px 0px 0px 2px ${theme('colors.neutral.100')}`,
        'outlined-dark-default': `inset 0px 0px 0px 2px ${theme('colors.neutral.700')}`,
        'xl': '0px 10px 40px rgba(27, 32, 50, 0.12)',
      }),
      backgroundColor: {
        light: '#ffffff80',
        dark: 'rgb(25 28 31)',
      },
      animation: {
        'fade-in-left': 'fadeLeft 300ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in-left-reverse': 'fadeleftReverse 300ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in-slow-left': 'fadeLeft 700ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in-slow-left-reverse': 'fadeleftReverse 700ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in-up': 'fadeUp 300ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in-up-reverse': 'fadeUpReverse 300ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in-down': 'fadeDown 300ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in-down-reverse': 'fadeDownReverse 300ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in-right': 'fadeRight 900ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in-right-reverse': 'fadeRightReverse 700ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'buzz': 'customAnimation 2s ease-in-out 0s infinite normal none running;',
        'flashing': 'flashing 2.5s ease-in-out infinite',
        'fade-in-zoomIn': 'ZoomIn 300ms cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in-zoomIn-reverse': 'ZoomInReverse 300ms cubic-bezier(0.4, 0, 0.2, 1) both',
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin.cjs')],
}
