import * as React from 'react';
import { Link } from 'react-router-dom';

export interface ILinkButtonProps {
  children: any;
  url: string;
  style?: Partial<{ [key: string]: any }>;
}

const defaultProps = {
  children: '',
  url: '/',
  style: {},
};

export default (props: ILinkButtonProps = defaultProps) => {
  return (
    <Link to={props.url} style={{ ...props.style }}>
      {props.children}
    </Link>
  );
};
