import React from 'react';
import classes from './MainHeader.module.css';

import { NavLink } from 'react-router-dom';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>StarWars</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              className={navData => (navData.isActive ? classes.active : '')}
              to='/'
            >
              All
            </NavLink>
          </li>
          <li>
            <NavLink
              className={navData => (navData.isActive ? classes.active : '')}
              to='fav'
            >
              Fav
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
