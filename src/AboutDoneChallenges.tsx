import classes from "./done.module.css";
import { SNIPPETS } from "./snippets";
import type { DoneChallenge } from "./types";

export function AboutDoneChallenges({
  challenges,
}: {
  challenges: DoneChallenge[];
}) {
  const countDone = challenges.length;
  const countPossible = SNIPPETS.size;

  if (!countDone) return null;

  return (
    <div className={classes.done}>
      <p>
        <b>
          You have completed {challenges.length} challenge
          {challenges.length === 1 ? "" : "s"}.
        </b>
      </p>

      <label htmlFor="id_progress">
        Challenges completed (of {countPossible}):
      </label>
      <progress
        id="id_progress"
        className={classes.progress}
        value={`${countDone}`}
        max={`${countPossible}`}
      />
      {/* {challenges.map((challenge, i) => (
          <dl key={challenge.id}>
            <dt>#</dt>
            <dd>{i + 1}</dd>
            <dt>hints</dt> <dd>{challenge.hints ? "Yes" : "never!"}</dd>
            <dt>took</dt>
            <dd>{challenge.tookSeconds} seconds</dd>
            <dt>guesses</dt>
            <dd>{challenge.guesses}</dd>
            <dt>gotIt: {challenge.gotIt ? "Yes!" : "sorry!"}</dt>
          </dl>
        ))} */}
    </div>
  );
}
