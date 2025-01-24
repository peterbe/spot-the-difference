import { useState } from "react";
import { SNIPPETS } from "./snippets";
import { getChallenge } from "./challenge";

type SnippetId = keyof typeof SNIPPETS;

function getRandomSnippetAndChallenge() {
  const keys = Array.from(Object.keys(SNIPPETS)) as SnippetId[];
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const snippet = SNIPPETS[randomKey];
  const snippetArr = Array.from(snippet.text);
  const differenceArr = Array.from(snippet.text);
  const challenge = getChallenge(snippetArr);
  differenceArr[challenge.characterAt] = challenge.replacement;
  return {
    snippet,
    snippetArr,
    differenceArr,
    challenge,
  };
}

export function useChallenge() {
  const [challenge, setChallenge] = useState(getRandomSnippetAndChallenge());

  function setNewChallenge() {
    let newChallenge = getRandomSnippetAndChallenge();
    while (newChallenge.snippet === challenge.snippet) {
      newChallenge = getRandomSnippetAndChallenge();
    }
    setChallenge(newChallenge);
  }

  return {
    challenge,
    setNewChallenge,
  };
}
