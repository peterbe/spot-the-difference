import JSConfetti from "js-confetti";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useDocumentTitle, useInterval } from "usehooks-ts";
import { AboutDoneChallenges } from "./AboutDoneChallenges";
import { ProgressTimer } from "./ProgressTimer";
import { WithShimmerEffect } from "./WithSimmerEffect";
import classes from "./play.module.css";

import { Settings } from "./settings";
import { useAudio } from "./use-audio-on";
import { type Challenge, useChallenge } from "./use-challenge";
import { useDoneChallenges } from "./use-done-challenges";
import { useHasNoHover } from "./use-has-no-hover";

const coinAudio = new Audio("/coin.mp3");
// const applauseAudio = useRef(new Audio("/applause.mp3")); // TODO USE WHEN FINISHED SNIPPETS
const clickAudio = new Audio("/click.mp3");

const INITIAL_HINT_RADIUS = 200;

export function Play() {
  const confetti = useRef(new JSConfetti());
  // const [audioOn, setAudioOn] = useLocalStorage("audio-on", true);
  const [audioOn] = useAudio();

  const { doneChallenges, setDoneChallenges } = useDoneChallenges();
  const { challenge, setNewChallenge } = useChallenge();

  const [guess, setGuess] = useState<number | null>(null);
  const [guessCount, setGuessCount] = useState(0);
  const [gotIt, setGotIt] = useState<boolean | null>(null);

  const [maxSeconds] = useState(60);
  const [seconds, setSeconds] = useState<number>(0);
  const [paused, setPaused] = useState(false);
  const [hardPaused, setHardPaused] = useState(false);
  const [stopped, setStopped] = useState(false);

  const [hintRadius, setHintRadius] = useState(0);
  const [countHints, setCountHints] = useState(0);

  useInterval(
    () => {
      // Your custom logic here
      setSeconds((p) => p + 1);
    },
    // Delay in milliseconds or null to stop it
    !(paused || hardPaused || stopped) ? 1000 : null,
  );

  useEffect(() => {
    if (challenge) {
      setSeconds(0);
    }
  }, [challenge]);

  useEffect(() => {
    if (seconds >= maxSeconds) {
      setStopped(true);
    }
  }, [seconds, maxSeconds]);

  useEffect(() => {
    if (stopped) {
      setDoneChallenges((prev) => {
        return {
          challenges: [
            ...prev.challenges.filter((c) => c.id !== challenge.id),
            {
              id: challenge.id,
              hints: countHints,
              tookSeconds: seconds,
              guesses: guess || 0,
              gotIt: true,
              when: new Date().toISOString(),
            },
          ],
        };
      });
    }
  }, [stopped, challenge.id, countHints, seconds, guess, setDoneChallenges]);

  useEffect(() => {
    function listener() {
      if (document.hidden) {
        setPaused(true);
      } else {
        setPaused(false);
      }
    }
    document.addEventListener("visibilitychange", listener);
    return () => {
      document.removeEventListener("visibilitychange", listener);
    };
  }, []);

  const hasNoHover = useHasNoHover();

  function clicked(event: React.MouseEvent<HTMLSpanElement>, nth: number) {
    event.preventDefault();
    if (stopped || paused || hardPaused) {
      return;
    }
    setGuess(nth);
    setGuessCount((prev) => prev + 1);

    const hit = isHit(
      nth,
      challenge.challenge.characterAt,
      challenge.snippetArr,
      {
        leninance: hasNoHover ? 1 : 0,
      },
    );

    if (hit) {
      setGotIt(true);
      setStopped(true);
      confetti.current.addConfetti();
      if (audioOn) {
        coinAudio.play();
        // applauseAudio.current.play();
      }
      setDoneChallenges((prev) => {
        return {
          challenges: [
            ...prev.challenges.filter((c) => c.id !== challenge.id),
            {
              id: challenge.id,
              hints: countHints,
              tookSeconds: seconds,
              guesses: guess || 0,
              gotIt: true,
              when: new Date().toISOString(),
            },
          ],
        };
      });
    } else {
      if (audioOn) {
        clickAudio.play();
      }
    }
    setHintRadius(0);
  }

  function reset() {
    setGuess(null);
    setGuessCount(0);
    setGotIt(null);
    setNewChallenge(doneChallenges.challenges.map((c) => c.id));
    setStopped(false);
    confetti.current.clearCanvas();
    setHintRadius(0);
    setCountHints(0);
  }

  const name = "Spot the Difference";
  let documentTitle = `Playing | ${name}`;
  if (gotIt) {
    documentTitle = `Congratulations! | ${name}`;
  } else if (paused || hardPaused) {
    documentTitle = `Paused | ${name}`;
  } else if (stopped) {
    documentTitle = `Stopped | ${name}`;
  }
  useDocumentTitle(documentTitle);

  // XXX refactor out to own component and memoized
  const snippetX = challenge.snippetArr.map((character, i) => {
    return (
      <span key={`${character}${i}`} onClick={(event) => clicked(event, i)}>
        {character}
      </span>
    );
  });
  const correctRef = useRef<HTMLSpanElement>(null);
  const differenceX = challenge.differenceArr.map((character, i) => {
    const bother = !(character === "\n" || character === " ");
    return (
      <span
        key={`${character}${i}`}
        ref={i === challenge.challenge.characterAt ? correctRef : undefined}
        onClick={(event) => bother && clicked(event, i)}
      >
        {character}
      </span>
    );
  });

  const hintOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hintRadius > 0 && correctRef.current && hintOverlayRef.current) {
      const rect = correctRef.current.getBoundingClientRect();

      const radisRatio = hintRadius / INITIAL_HINT_RADIUS;
      const jitter = Math.random() * 20 * radisRatio;
      const radius = hintRadius;

      hintOverlayRef.current.style.width = `${radius}px`;
      hintOverlayRef.current.style.height = `${radius}px`;

      const offsetLeft = Math.random() > 0.5 ? jitter : -jitter;
      const offsetTop = Math.random() > 0.5 ? jitter : -jitter;

      hintOverlayRef.current.style.left = `${
        offsetLeft + rect.left + rect.width / 2 - radius / 2
      }px`;
      hintOverlayRef.current.style.top = `${
        offsetTop + rect.top + rect.height / 2 - radius / 2
      }px`;
    }
  }, [hintRadius]);

  return (
    <article>
      {challenge && (
        <div className="grid">
          <div>
            <h4>Original</h4>
            <div className={paused || hardPaused ? classes.paused : undefined}>
              <pre
                className={`${classes.snippets} ${
                  stopped ? classes.snippetsStopped : ""
                }`}
              >
                {snippetX}
              </pre>
            </div>
            <p>
              Type: <b>{challenge.snippet.category}</b>
            </p>
          </div>

          <div>
            <h4>Messed with</h4>
            <div className={paused || hardPaused ? classes.paused : undefined}>
              <pre
                className={`${classes.snippets} ${
                  stopped ? classes.snippetsStopped : ""
                }`}
              >
                {differenceX}
              </pre>
            </div>
            <p>click the character that is different ⤴</p>
          </div>
        </div>
      )}
      {hintRadius > 0 && (
        <div
          className={classes.hintOverlay}
          ref={hintOverlayRef}
          style={{ opacity: hintRadius / 100 }}
        />
      )}
      <div className="grid">
        <p>
          Guesses: <b>{guessCount}</b>
        </p>
        {countHints > 0 && <p>Hint engaged!</p>}
        {/* {stopped && (
          <WithShimmerEffect>
            <hgroup>
              <h3>Stopped</h3>
              <p>Click "Next!"</p>
            </hgroup>
          </WithShimmerEffect>
        )} */}
      </div>
      {(gotIt !== null || stopped) && (
        <hgroup style={{ textAlign: "center" }}>
          <h2>
            {gotIt ? "You did it!" : stopped ? "Time ran out" : "Wrong"}{" "}
            {gotIt ? <RandomHappyEmoji /> : <RandomSadEmoji />}
          </h2>
          <WithShimmerEffect>
            <p>Click "Next!"</p>
          </WithShimmerEffect>
        </hgroup>
      )}

      <ProgressTimer seconds={seconds} maxSeconds={maxSeconds} />

      {challenge && (
        <div role="group">
          <button
            disabled={!!stopped}
            type="button"
            onClick={() => {
              setHardPaused((was) => !was);
            }}
          >
            {hardPaused ? "Unpause" : "Pause"}
          </button>

          <button
            disabled={!!stopped || paused || hardPaused}
            type="button"
            onClick={() => {
              if (correctRef.current) {
                if (hintRadius === 0) {
                  setHintRadius(INITIAL_HINT_RADIUS);
                } else {
                  setHintRadius(0);
                  // setHintRadius((prev) => Math.max(10, prev - 10));
                }
                setCountHints((prev) => prev + 1);
              }
            }}
          >
            Hint
          </button>

          <button
            type="button"
            disabled={!!paused}
            onClick={() => {
              reset();
            }}
          >
            Next!
          </button>
        </div>
      )}

      {doneChallenges.challenges.length > 0 && (
        <AboutDoneChallenges challenges={doneChallenges.challenges} />
      )}

      <Settings />

      <CheatMaybe challenge={challenge} />
    </article>
  );
}

function isHit(
  picked: number,
  correct: number,
  snippetArr: string[],
  options: { leninance: number },
) {
  if (picked === correct) return true;
  if (options.leninance > 0) {
    const prevCharacter = snippetArr[picked - 1];
    const nextCharacter = snippetArr[picked + 1];
    if (picked === correct - 1 && prevCharacter !== "\n") return true;
    if (picked === correct + 1 && nextCharacter !== "\n") return true;
  }

  return false;
}

function CheatMaybe({ challenge }: { challenge: Challenge }) {
  const [searchParams] = useSearchParams();
  const cheat = Boolean(JSON.parse(searchParams.get("cheat") || "false"));

  if (cheat) {
    return (
      <div style={{ marginTop: 30 }}>
        <hr />
        <pre>{JSON.stringify(challenge.challenge, undefined, 2)}</pre>
      </div>
    );
  }

  return null;
}

function RandomHappyEmoji() {
  const emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
  ];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return <span>{emojis[randomIndex]}</span>;
}
function RandomSadEmoji() {
  const emojis = [
    "😢",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
  ];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return <span>{emojis[randomIndex]}</span>;
}
