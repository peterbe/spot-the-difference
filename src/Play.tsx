import { useEffect, useRef, useState } from "react";
import classes from "./play.module.css";
import { useChallenge } from "./use-challenge";
import { Timer } from "./Timer";
import JSConfetti from "js-confetti";

export function Play() {
  const confetti = useRef(new JSConfetti());
  const { challenge, setNewChallenge } = useChallenge();

  const [guess, setGuess] = useState<number | null>(null);
  const [guessCount, setGuessCount] = useState(0);
  const [gotIt, setGotIt] = useState<boolean | null>(null);
  const [started, setStarted] = useState(new Date());
  const [stopped, setStopped] = useState<Date | null>(null);
  useEffect(() => {
    setStarted(new Date());
  }, [challenge]);

  function clicked(event: React.MouseEvent<HTMLSpanElement>, nth: number) {
    event.preventDefault();
    if (stopped) {
      return;
    }
    setGuess(nth);
    setGuessCount((prev) => prev + 1);
    if (nth === challenge.challenge.characterAt) {
      setGotIt(true);
      setStopped(new Date());
      confetti.current.addConfetti();
    }
  }

  function reset() {
    setGuess(null);
    setGuessCount(0);
    setGotIt(null);
    setStopped(null);
    setNewChallenge();
    confetti.current.clearCanvas();
  }

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
    <div>
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
              <td>
                <pre className={classes.snippets}>{snippetX}</pre>
              </td>
              <td>
                <pre className={classes.snippets}>{differenceX}</pre>
              </td>
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
      {gotIt !== null && (
        <article>
          <header>
            {gotIt && <RandomHappyEmoji />}
            {gotIt ? "You did it!" : "Wrong"}
            {!gotIt && <RandomSadEmoji />}
          </header>
        </article>
      )}

      <Timer started={started} stopped={stopped} />

      <button
        type="button"
        onClick={() => {
          reset();
        }}
      >
        Next!
      </button>
      <hr />
      <pre>{JSON.stringify(challenge.challenge, undefined, 2)}</pre>
    </div>
  );
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
