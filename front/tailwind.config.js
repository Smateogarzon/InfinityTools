/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  important: '#root',
  theme: {
    screens: {
      xsm: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    fontFamily: {
      sans: ['system-ui', 'sans-serif'],
      chelsea: ['Chelsea-Market', 'cursive'],
    },
    // https://coolors.co/eee3d6-c55d38-568a3f-394b38
    colors: {
      'bright-sun': {
        50: '#fffbeb',
        100: '#fff5c6',
        200: '#ffe988',
        300: '#ffd43c', // Accent
        400: '#ffc420',
        500: '#f9a207',
        600: '#ff6b00',
        700: '#b75506',
        800: '#94410c',
        900: '#7a370d',
        950: '#461b02',
      },
      zeus: {
        50: '#f5f5f1',
        100: '#e5e5dc',
        200: '#ccccbc',
        300: '#afaf95',
        400: '#989677',
        500: '#898569',
        600: '#757059',
        700: '#5f5949',
        800: '#524c41',
        900: '#48433b',
        950: '#211e1a', // BGs
        975: '#1C1914',
      },

      'athens-gray': {
        50: '#f6f8f9',
        100: '#eef0f2',
        200: '#d7dce0',
        300: '#b3bec6',
        400: '#8a9aa6',
        500: '#6c7e8b',
        600: '#566673',
        700: '#47535d',
        800: '#3d474f',
        900: '#363e44',
        950: '#24282d',
      },
      'dusty-gray': {
        50: '#f8f8f8',
        100: '#f2f1f1',
        200: '#e7e4e6',
        300: '#d3ced1',
        400: '#bab2b6',
        500: '#a2999e',
        600: '#847a80',
        700: '#6c6469',
        800: '#5c555a',
        900: '#514a4f',
        950: '#2a2729',
      },
      Black: {
        full: '#000000',
        low: '#1C1914',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.custom-transparent-bg': {
          backgroundColor: 'transparent',
        },
        '.custom-width': {
          width: '17em',
        },
        '.custom-border': {
          border: 'solid 1px #381812',
        },
        '.custom-border-b': {
          borderBottom: '1px solid #381812',
        },
        '.custom-border-y': {
          borderTop: '1px solid #381812;',
          borderBottom: '1px solid #381812;',
        },
        '.custom-border-2': {
          border: 'solid 1px #c55d38',
        },
        '.clip-polygon': {
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
  corePlugins: {
    preflight: false,
  },
};
