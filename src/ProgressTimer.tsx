import classes from "./progress-timer.module.css";
export function ProgressTimer({
  seconds,
  maxSeconds,
}: {
  seconds: number;
  maxSeconds: number;
}) {
  return (
    <progress
      className={classes.progress}
      value={`${seconds}`}
      max={`${maxSeconds}`}
    />
  );
}
