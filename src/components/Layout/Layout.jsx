import React from 'react';
import NavMenu from './NavMenu';
import logo from './logo.svg';

const Layout = ({ navbar, children }) => {
  return (
    <div className="Layout">
      <nav className="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="#no">
            <img src={logo} width="34" height="34" alt="logo" />
          </a>
        </div>
        <div className="navbar-menu">{navbar}</div>
      </nav>
      <div className="columns" style={{ margin: 0 }}>
        <div className="column is-narrow" style={{ width: '80px', padding: '0' }}>
          <NavMenu />
        </div>
      </div>
    </div>
  );
};

export default Layout;
