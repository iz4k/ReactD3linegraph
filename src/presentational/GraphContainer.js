import styled from 'styled-components';

const GraphContainer = styled.div`
  height: 500px;
  margin: 40px;
  margin-right: 0px;
  svg:not(:root) {
    overflow: visible;
  }
  g line {
    stroke: lightgrey;
  }
  svg {
    cursor: pointer;
  }
  .dataline {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 3px;
  }
  .selectorline {
    fill: none;
    stroke-width: 3px;
    stroke: #d1d1d1;
    stroke-dasharray: 5;
  }
`;

export default GraphContainer;