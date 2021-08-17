import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";
import authService from "../../services/auth.service";

const Nav = (): JSX.Element => {
  const handleLogOut = () => {
    authService.logout();
    window.location.reload();
  };
  return (
    <div className="Nav" data-testid="Nav">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/targets">Targets</Link>
          </li>
          <li>
            <Link to="/rankings">Rankings</Link>
          </li>
          <li>
            <Link to="/find-selector">Find Selector</Link>
          </li>
          <li>
            <Link to="/get-rankings">Get Rankings</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogOut}>
              LOG OUT
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
