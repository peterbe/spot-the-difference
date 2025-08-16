import { useId } from "react";
import type { DoneChallenge } from "./db";
import classes from "./done.module.css";
import { SNIPPETS } from "./snippets";

export function AboutDoneChallenges({
  challenges,
}: {
  challenges: DoneChallenge[];
}) {
  const countDone = challenges.length;
  const countPossible = SNIPPETS.size;

  const id = useId();
  if (!countDone) return null;

  return (
    <div className={classes.done}>
      <label htmlFor={id}>
        {/* Challenges completed (of {countPossible}): */}
        You have completed {challenges.length} challenge
        {challenges.length === 1 ? "" : "s"} (of {countPossible} possible).
      </label>
      <progress
        id={id}
        className={classes.progress}
        value={`${countDone}`}
        max={`${countPossible}`}
      />
    </div>
  );
}
