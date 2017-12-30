import { injectGlobal } from 'styled-components';
import { normalize } from 'polished';

export default () => injectGlobal`
  ${normalize()}
  body {
    font-family: sans-serif;
  }
`;