import styled from 'styled-components';

const GraphContainer = styled.div`
  min-height: 500px;
  margin: 40px;
  svg:not(:root) {
    overflow: visible;
  }
  path {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 5;
  }
`;

export default GraphContainer;