// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import './App.css'
import { useNavigate } from "react-router";
import classes from "./app.module.css";

export function App() {
  let navigate = useNavigate();
  return (
    <div className={classes.hero}>
      <div>
        <img src="/goose-500.png" alt="Goose" />
      </div>

      <div>
        <button
          onClick={() => {
            navigate("/play");
          }}
        >
          Start!
        </button>
      </div>
    </div>
  );
}
