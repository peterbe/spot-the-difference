import { useState } from "react";
import { useInterval } from "usehooks-ts";

const HAPPY_EMOJIS = [
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
const SAD_EMOJIS = [
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

export function RandomHappyEmoji() {
  return <RandomEmoji emojis={HAPPY_EMOJIS} />;
}

export function RandomSadEmoji() {
  return <RandomEmoji emojis={SAD_EMOJIS} />;
}

function RandomEmoji({ emojis }: { emojis: string[] }) {
  const [emoji, setEmoji] = useState(() => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  });
  useInterval(() => {
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
  }, 1000);
  return <span>{emoji}</span>;
}
