import * as React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  color: ${(props: { primary: boolean }) => (props.primary ? 'red' : '#1bb4ef')};
  background: blue;
  outline: none;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
`;

export interface IButtonProps {
  onClick: () => void;
  primary?: boolean;
  children: any;
}

export const Button: React.StatelessComponent<IButtonProps> = ({ onClick, primary = false, children }) => (
  <StyledButton primary={primary} onClick={onClick}>
    {children}
  </StyledButton>
);
