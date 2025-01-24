import { useNavigate } from "react-router";
import classes from "./app.module.css";

export function App() {
  const navigate = useNavigate();
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
