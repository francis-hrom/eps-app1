import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = (): JSX.Element => (
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
      </ul>
    </nav>
  </div>
);

export default Nav;
