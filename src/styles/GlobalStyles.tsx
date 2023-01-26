import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro';

import Fonts from './Fonts';

const CustomStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    -webkit-tap-highlight-color: ${theme<string>`colors.purple.500`};
    ${tw`antialiased`}
  }

  * {
    ${tw`text-base font-poppins`}
  }
`;

const GlobalStyles = () => (
  <>
    <Fonts />
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
