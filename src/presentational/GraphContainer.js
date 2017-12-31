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
  .dataline {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 3px;
  }
`;

export default GraphContainer;