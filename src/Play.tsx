import JSConfetti from "js-confetti";
import { useEffect, useRef, useState } from "react";
import { useTimer } from "react-timer-hook";
import { useDocumentTitle } from "usehooks-ts";
import { AboutDoneChallenges } from "./AboutDoneChallenges";
import { DoneThemAll } from "./DoneThemAll";
import { ProgressTimer } from "./ProgressTimer";
import { WithShimmerEffect } from "./WithSimmerEffect";
import classes from "./play.module.css";
import { Settings } from "./settings";
import { SNIPPETS } from "./snippets";
import { useAudio } from "./use-audio-on";
import { useChallenge } from "./use-challenge";
import { useDoneChallenges } from "./use-done-challenges";
import { useEnableTimer } from "./use-enable-timer";
import { useHasNoHover } from "./use-has-no-hover";

const coinAudio = new Audio("/coin.mp3");
const clickAudio = new Audio("/click.mp3");
// const applauseAudio = new Audio("/applause.mp3"); // TODO USE WHEN FINISHED SNIPPETS

const INITIAL_HINT_RADIUS = 200;

const maxSeconds = 60;

export function Play() {
  const confetti = useRef(new JSConfetti());
  const [audioOn] = useAudio();

  const { doneChallenges, addDoneChallenge } = useDoneChallenges();

  const doneThemAll = doneChallenges && doneChallenges.length > SNIPPETS.size;
  const { challenge, setNewChallenge } = useChallenge();

  const [timer] = useEnableTimer();

  // XXX Is this still needed??
  const stoppedChallengeIds = useRef(new Set<string>());

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60);

  const {
    seconds,
    isRunning,
    pause: pauseTimer,
    resume: resumeTimer,
    restart: restartTimer,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setStopped(true);
      if (challenge) {
        if (!stoppedChallengeIds.current.has(challenge.id)) {
          stoppedChallengeIds.current.add(challenge.id);

          addDoneChallenge({
            challengeId: challenge.id,
            hints: countHints,
            tookSeconds: seconds,
            guesses: guessCount || 0,
            gotIt: false,
            when: new Date().toISOString(),
            timer,
          });
        }
      }
    },
    interval: 1000,
  });

  useEffect(() => {
    if (doneChallenges && doneChallenges.length > SNIPPETS.size) {
      pauseTimer();
    }
  }, [doneChallenges, pauseTimer]);

  // perhaps some day do something with the guess to say it was close or not
  const [, setGuess] = useState<number | null>(null);
  const [guessCount, setGuessCount] = useState(0);
  const [gotIt, setGotIt] = useState<boolean | null>(null);

  const [paused, setPaused] = useState(false);
  const [hardPaused, setHardPaused] = useState(false);
  const [stopped, setStopped] = useState(false);

  const [hintRadius, setHintRadius] = useState(0);
  const [countHints, setCountHints] = useState(0);

  useEffect(() => {
    if (challenge) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + maxSeconds);
      restartTimer(time);
    }
  }, [challenge, restartTimer]);

  useEffect(() => {
    function listener() {
      if (document.hidden) {
        setPaused(true);
        pauseTimer();
      } else {
        setPaused(false);
        if (!hardPaused && challenge && !stopped) {
          resumeTimer();
        }
      }
    }
    document.addEventListener("visibilitychange", listener);
    return () => {
      document.removeEventListener("visibilitychange", listener);
    };
  }, [pauseTimer, resumeTimer, hardPaused, stopped, challenge]);

  const hasNoHover = useHasNoHover();

  function clicked(event: React.MouseEvent<HTMLSpanElement>, nth: number) {
    event.preventDefault();
    if ((stopped || paused || hardPaused) && timer) {
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
      pauseTimer();
      confetti.current.addConfetti();
      if (audioOn) {
        coinAudio.play();
        // applauseAudio.current.play();
      }

      addDoneChallenge({
        challengeId: challenge.id,
        hints: countHints,
        tookSeconds: seconds,
        guesses: guessCount || 0,
        gotIt: true,
        when: new Date().toISOString(),
        timer,
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
    setNewChallenge(
      doneChallenges ? doneChallenges.map((c) => c.challengeId) : [],
    );
    setStopped(false);
    confetti.current.clearCanvas();
    setHintRadius(0);
    setCountHints(0);

    const time = new Date();
    time.setSeconds(time.getSeconds() + maxSeconds);
    restartTimer(time);
  }

  const name = "Spot the Difference";
  let documentTitle = `Playing | ${name}`;
  if (gotIt) {
    documentTitle = `Congratulations! | ${name}`;
  } else if (stopped && timer) {
    documentTitle = `Stopped | ${name}`;
  } else if ((paused || hardPaused) && timer) {
    documentTitle = `Paused | ${name}`;
  }
  useDocumentTitle(documentTitle);

  const correctRef = useRef<HTMLSpanElement>(null);
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

  const blurText = (paused || hardPaused) && timer;

  return (
    <article>
      {doneThemAll && <DoneThemAll />}
      {!doneThemAll && (
        <div className="grid">
          <div>
            <h4>Original</h4>
            <div className={blurText ? classes.paused : undefined}>
              <pre
                data-testid="original-snippet"
                className={`${classes.snippets} ${
                  stopped ? classes.snippetsStopped : ""
                }`}
              >
                {challenge.snippetArr.map((character, i) => {
                  return (
                    <span
                      key={`${character}${i}`}
                      onClick={(event) => clicked(event, i)}
                    >
                      {character}
                    </span>
                  );
                })}
              </pre>
            </div>
            <p>
              Type: <b>{challenge.snippet.category}</b>
            </p>
          </div>

          <div>
            <h4>Messed with</h4>
            <div className={blurText ? classes.paused : undefined}>
              <pre
                data-testid="messed-with-snippet"
                className={`${classes.snippets} ${
                  stopped ? classes.snippetsStopped : ""
                }`}
              >
                {challenge.differenceArr.map((character, i) => {
                  const bother = !(character === "\n" || character === " ");
                  return (
                    <span
                      key={`${character}${i}`}
                      ref={
                        i === challenge.challenge.characterAt
                          ? correctRef
                          : undefined
                      }
                      onClick={(event) => bother && clicked(event, i)}
                    >
                      {character}
                    </span>
                  );
                })}
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
        {guessCount > 0 ? (
          <p style={{ textAlign: "right" }}>
            Guesses: <b>{guessCount}</b>
          </p>
        ) : (
          <p> &nbsp; </p>
        )}

        {/* {countHints > 0 && <p>Hint engaged!</p>} */}
        {countHints === 1 && <p>You're only human!</p>}
        {countHints > 1 && <p>Used a hint</p>}
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

      {timer && !doneThemAll && (
        <ProgressTimer
          seconds={seconds === 0 ? seconds : maxSeconds - seconds}
          maxSeconds={maxSeconds}
        />
      )}

      {!doneThemAll && (
        <div role="group">
          {timer && (
            <button
              disabled={!!stopped}
              type="button"
              onClick={() => {
                setHardPaused((was) => !was);
                if (isRunning) {
                  pauseTimer();
                } else {
                  resumeTimer();
                }
              }}
            >
              {hardPaused ? "Unpause" : "Pause"}
            </button>
          )}

          <button
            disabled={timer && (!!stopped || paused || hardPaused)}
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

      {doneChallenges && doneChallenges.length > 0 && (
        <AboutDoneChallenges challenges={doneChallenges} />
      )}

      <Settings />
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
