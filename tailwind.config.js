const Color = require('color');
const alpha = (clr, val) => Color(clr).alpha(val).rgb().string();
const lighen = (clr, val) => Color(clr).lighten(val).rgb().string();
const darken = (clr, val) => Color(clr).darken(val).rgb().string();

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './apps/castmate/layouts/**/*.{js,ts,jsx,tsx}',
      './apps/castmate/pages/**/*.{js,ts,jsx,tsx}',
    ],
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: lighen('#0E78F9', 0.2),
          DEFAULT: '#0E78F9',
        },
        surface: {
          light: lighen('#293042', 0.2),
          dark: darken('#293042', 0.1),
          DEFAULT: '#293042',
        },
        background: '#181C23',
        accent: '#1E2532',
        hr: darken('#FFFFFF', 0.1),
        text: '#EEEEEE',
        twitch: {
          light: lighen('#6542a6', 0.2),
          DEFAULT: '#6542a6',
        },
        google: {
          light: lighen('#4285F4', 0.2),
          DEFAULT: '#4285F4',
        },
      },
      height: {
        '10px': '10px',
        '32px': '32px',
        '40px': '40px',
        '48px': '48px',
        '50px': '50px',
        '60px': '60px',
        '70px': '70px',
      },
      width: {
        '10px': '10px',
        '32px': '32px',
        '40px': '40px',
        '48px': '48px',
        '50px': '50px',
        '60px': '60px',
        '70px': '70px',
        '72px': '72px',
        '120px': '120px',
        '240px': '240px',
        '320px': '320px',
      },
      fontFamily: {
        sans: 'Inter',
      },
      gridTemplateColumns: {
        'fill-240px': 'repeat(auto-fill, 240px)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
