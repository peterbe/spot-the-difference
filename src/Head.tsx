import classes from "./head.module.css";

import { NavLink } from "react-router";

export function Head() {
  // return <h1 className={classes.title}>Spot the Difference</h1>;
  return (
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
      </ul>
    </nav>
  );
}
