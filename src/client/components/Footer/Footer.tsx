import * as React from 'react';
import styled from 'styled-components';

const Text = styled.span`
  color: red;
`;

const date = () => {
  return new Date().getFullYear();
};

const Footer = () => (
  <div id="footer">
    <Text>&copy; {date()}</Text>
  </div>
);

export default Footer;
