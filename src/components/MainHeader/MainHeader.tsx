import React from 'react';
import classes from './MainHeader.module.css';

import { NavLink } from 'react-router-dom';

const MainHeader: React.FC = (): JSX.Element => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Pokemon Cards</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              className={navData => (navData.isActive ? classes.active : '')}
              to='/'
            >
              Wszystkie
            </NavLink>
          </li>
          <li>
            <NavLink
              className={navData => (navData.isActive ? classes.active : '')}
              to='fav'
            >
              Ulubione
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
