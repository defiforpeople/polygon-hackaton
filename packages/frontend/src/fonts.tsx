import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'Louis George Cafe';
      src: url('../public/fonts/Louis-George-Cafe.woff2') format('woff2');
    }
    @font-face {
      font-family: 'Louis George Cafe';
      src: url('../public/fonts/Louis-George-Cafe-Light.ttf') format('ttf');
      font-weight: lighter;
    }
    @font-face {
      font-family: 'Louis George Cafe';
      src: url('../public/fonts/Louis-George-Cafe-Light-Italic.ttf') format('ttf');
      font-weight: lighter;
      font-style: italic;
    }
    @font-face {
      font-family: 'Louis George Cafe';
      src: url('../public/fonts/Louis-George-Cafe-Italic.ttf') format('ttf');
      font-style: italic;
    }
    @font-face {
      font-family: 'Louis George Cafe';
      src: url('../public/fonts/Louis-George-Cafe-Bold.ttf') format('ttf');
      font-weight: bold;
    }
    @font-face {
      font-family: 'Louis George Cafe';
      src: url('../public/fonts/Louis-George-Cafe-Bold-Italic.ttf') format('ttf');
      font-weight: bold;
      font-style: italic;
    }    
  `}
  />
);

export default Fonts;
