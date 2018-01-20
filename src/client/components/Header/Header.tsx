import * as React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div id="header">
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/about"> About </Link>
          <Link to="/product"> Product </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
