import classes from "./done-them-all.module.css";
import { useDoneChallenges } from "./use-done-challenges";
export function DoneThemAll() {
  const { removeDoneChallenges } = useDoneChallenges();
  return (
    <div style={{ textAlign: "center" }} className={classes.container}>
      <h2 className={classes.header}>You've done them all!</h2>
      <button
        type="button"
        className={classes.button}
        onClick={() => {
          removeDoneChallenges();
        }}
      >
        Reset done challenges
      </button>
    </div>
  );
}
