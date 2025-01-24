import { useEffect, useRef, useState } from "react";
import classes from "./play.module.css";
import { type Challenge, useChallenge } from "./use-challenge";
import JSConfetti from "js-confetti";
import { useInterval, useDocumentTitle, useLocalStorage } from "usehooks-ts";
import { ProgressTimer } from "./ProgressTimer";
import { WithShimmerEffect } from "./WithSimmerEffect";
import { useSearchParams } from "react-router";

const coinAudio = new Audio("/coin.mp3");
// const applauseAudio = useRef(new Audio("/applause.mp3")); // TODO USE WHEN FINISHED SNIPPETS
const clickAudio = new Audio("/click.mp3");

export function Play() {
  const confetti = useRef(new JSConfetti());
  const [audioOn, setAudioOn] = useLocalStorage("audio-on", true);

  const { challenge, setNewChallenge } = useChallenge();

  const [guess, setGuess] = useState<number | null>(null);
  const [guessCount, setGuessCount] = useState(0);
  const [gotIt, setGotIt] = useState<boolean | null>(null);

  const [maxSeconds] = useState(60);
  const [seconds, setSeconds] = useState<number>(0);
  const [paused, setPaused] = useState(false);
  const [hardPaused, setHardPaused] = useState(false);
  const [stopped, setStopped] = useState(false);

  useInterval(
    () => {
      // Your custom logic here
      setSeconds((p) => p + 1);
    },
    // Delay in milliseconds or null to stop it
    !(paused || hardPaused || stopped) ? 1000 : null
  );

  useEffect(() => {
    setSeconds(0);
  }, [challenge]);

  useEffect(() => {
    if (seconds >= maxSeconds) {
      setStopped(true);
    }
  }, [seconds, maxSeconds]);

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
  }, [setPaused]);

  function clicked(event: React.MouseEvent<HTMLSpanElement>, nth: number) {
    event.preventDefault();
    if (stopped || paused || hardPaused) {
      return;
    }
    setGuess(nth);
    setGuessCount((prev) => prev + 1);
    if (nth === challenge.challenge.characterAt) {
      setGotIt(true);
      setStopped(true);
      confetti.current.addConfetti();
      if (audioOn) {
        coinAudio.play();
        // applauseAudio.current.play();
      }
    } else {
      if (audioOn) {
        clickAudio.play();
      }
    }
  }

  function reset() {
    setGuess(null);
    setGuessCount(0);
    setGotIt(null);
    setNewChallenge();
    setStopped(false);
    confetti.current.clearCanvas();
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
  const differenceX = challenge.differenceArr.map((character, i) => {
    const bother = !(character === "\n" || character === " ");
    return (
      <span
        key={`${character}${i}`}
        onClick={(event) => bother && clicked(event, i)}
      >
        {character}
      </span>
    );
  });

  return (
    <article>
      {challenge && (
        <table>
          <thead>
            <tr>
              <th>Original</th>
              <th>Messed with</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={paused || hardPaused ? classes.paused : undefined}>
                <pre className={classes.snippets}>{snippetX}</pre>
              </td>
              <td className={paused || hardPaused ? classes.paused : undefined}>
                <pre className={classes.snippets}>{differenceX}</pre>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>click the character that is different ⤴︎ </td>
            </tr>
          </tbody>
        </table>
      )}
      {guess && (
        <p>
          You clicked on <b>{challenge.snippetArr[guess]}</b>
        </p>
      )}
      <p>
        Guesses: <b>{guessCount}</b>
      </p>
      {stopped && (
        <WithShimmerEffect>
          <hgroup>
            <h3>Stopped</h3>
            <p>Click "Next!"</p>
          </hgroup>
        </WithShimmerEffect>
      )}
      {(gotIt !== null || stopped) && (
        <article>
          <header>
            {gotIt && <RandomHappyEmoji />}
            {gotIt ? "You did it!" : stopped ? "Time ran out" : "Wrong"}
            {!gotIt && <RandomSadEmoji />}
          </header>
        </article>
      )}

      {/* <p>
        Seconds: <code>{seconds}</code>
        <br />
        Paused: <code>{JSON.stringify(paused)}</code>
        <br />
        Hardpaused: <code>{JSON.stringify(hardPaused)}</code>
        <br />
        Stopped: <code>{JSON.stringify(stopped)}</code>
        <br />
      </p> */}
      <ProgressTimer seconds={seconds} maxSeconds={maxSeconds} />

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
          type="button"
          disabled={!!paused}
          onClick={() => {
            reset();
          }}
        >
          Next!
        </button>
      </div>

      <fieldset className={classes.settings}>
        <label>
          <input
            name="audio"
            type="checkbox"
            role="switch"
            checked={audioOn}
            onChange={() => {
              setAudioOn((was) => !was);
            }}
          />{" "}
          Sounds on
        </label>
      </fieldset>

      <CheatMaybe challenge={challenge} />
    </article>
  );
}

function CheatMaybe({ challenge }: { challenge: Challenge }) {
  const [searchParams] = useSearchParams();
  const cheat = Boolean(JSON.parse(searchParams.get("cheat") || "false"));

  if (cheat) {
    return (
      <div style={{ marginTop: 30 }}>
        <hr />
        <pre>{JSON.stringify(challenge.challenge, undefined, 2)}</pre>;
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
