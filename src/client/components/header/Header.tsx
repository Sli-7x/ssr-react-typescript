import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IHeaderProps {}

export class Header extends React.Component<IHeaderProps, any> {
  render() {
    return (
      <div id="header">
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/product"> Product </Link>
      </div>
    );
  }
}
