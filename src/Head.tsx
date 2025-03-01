import classes from "./head.module.css";

import { NavLink } from "react-router";

export function Head() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <h1 className={classes.title}>
              <NavLink to="/">Spot the Difference</NavLink>
            </h1>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/stats">Stats</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
