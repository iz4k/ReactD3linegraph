import styled from 'styled-components';

const ToggleButton = styled.button`
  color: #333;
  border-color: #d1d1d1;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  &:before {
    content: "";
    display: inline-block;
    width: 1em;
    height: 1em;
    background-color: ${props => props.color};
    border-radius: 50%;
    margin-right: 5px;
  }
`;

export default ToggleButton;