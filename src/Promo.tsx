import { useNavigate } from "react-router";
import classes from "./promo.module.css";

export function Promo() {
  const navigate = useNavigate();
  return (
    <div className={classes.banner}>
      <p>What are you waiting for?</p>
      <button
        type="button"
        onClick={() => {
          navigate("/play");
        }}
      >
        Start!
      </button>
    </div>
  );
}
