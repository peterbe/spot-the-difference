import type { DoneChallenge } from "./types";

export function AboutDoneChallenges({
  challenges,
}: {
  challenges: DoneChallenge[];
}) {
  return (
    <article>
      <details>
        <summary>You have completed {challenges.length} challenges.</summary>
        {challenges.map((challenge, i) => (
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
        ))}
      </details>
    </article>
  );
}
