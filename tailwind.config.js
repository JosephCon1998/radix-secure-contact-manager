module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        MSSansSerif: ['MSSansSerif', 'sans-serif'],
        MSSansSerifBold: ['MSSansSerifBold', 'sans-serif'],
      },
      cursor: {
        MsDefault: 'url(./icons/windows-98-cursors/Cursor79.cur), pointer',
        MsPointer: 'url(./icons/windows-98-cursors/Cursor107.cur), pointer',
        MsDrag: 'url(./icons/windows-98-cursors/Cursor97.cur), pointer',
      },
      colors: {
        wgreen: '#2F7274',
        wblue: {
          100: '#3173C3',
          200: '#11268A',
        },
        wgray: '#B8B8B8',
      },
    },
  },
  plugins: [],
};
