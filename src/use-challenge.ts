import { useState } from "react";
import { type SnippetChallenge, getSnippetChallenge } from "./challenge";
import { SNIPPETS, type Snippet } from "./snippets";

export type Challenge = {
  id: string;
  snippet: Snippet;
  snippetArr: string[];
  differenceArr: string[];
  challenge: SnippetChallenge;
};

function getRandomSnippetAndChallenge(): Challenge {
  const keys = Array.from(SNIPPETS.keys());
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const snippet = SNIPPETS.get(randomKey);
  if (!snippet) throw new Error(randomKey);
  const snippetArr = Array.from(snippet.text);
  const differenceArr = Array.from(snippet.text);
  const challenge = getSnippetChallenge(snippetArr);
  differenceArr[challenge.characterAt] = challenge.replacement;
  return {
    id: randomKey,
    snippet,
    snippetArr,
    differenceArr,
    challenge,
  };
}

export function useChallenge() {
  const [challenge, setChallenge] = useState(() =>
    getRandomSnippetAndChallenge()
  );

  function setNewChallenge(previousDoneIds: string[]) {
    let newChallenge = getRandomSnippetAndChallenge();
    while (
      newChallenge.snippet === challenge.snippet &&
      SNIPPETS.size > previousDoneIds.length
    ) {
      newChallenge = getRandomSnippetAndChallenge();
    }
    setChallenge(newChallenge);
  }

  return {
    challenge,
    setNewChallenge,
  };
}
