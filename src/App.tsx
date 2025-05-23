import { useNavigate } from "react-router";
import classes from "./app.module.css";

export function App() {
  const navigate = useNavigate();
  return (
    <div className={classes.hero}>
      <div>
        <img src="/goose-500.webp" alt="Goose" width="512" height="512" />
      </div>

      <div>
        <button
          type="button"
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
