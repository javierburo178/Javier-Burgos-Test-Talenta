import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>
      <Link to="/films">Films Place it</Link>
    </h1>
  </header>
);

export default Header;