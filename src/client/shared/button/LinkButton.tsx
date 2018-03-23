import * as React from 'react';
import { Link } from 'react-router-dom';

export interface ILinkButtonProps {
  children: any;
  url: string;
  style?: Partial<{ [key: string]: any }>;
}

export const LinkButton: React.StatelessComponent<ILinkButtonProps> = props => (
  <Link to={props.url} style={{ ...props.style }}>
    {props.children}
  </Link>
);

LinkButton.defaultProps = {
  children: '',
  url: '/',
  style: {},
};
