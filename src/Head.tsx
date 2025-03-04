import classes from "./head.module.css";

import { NavLink, useLocation } from "react-router";

export function Head() {
  const { pathname } = useLocation();
  const showPlayLink = !(pathname === "/play" || pathname === "/");

  return (
    <header>
      <nav data-testid="nav">
        <ul>
          <li>
            <h1 className={classes.title}>
              <NavLink to="/">Spot the Difference</NavLink>
            </h1>
          </li>
        </ul>
        <ul>
          {showPlayLink && (
            <li>
              <NavLink to="/play">Play!</NavLink>
            </li>
          )}
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
