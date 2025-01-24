export type SnippetChallenge = {
  characterAt: number;
  replacement: string;
};
export function getSnippetChallenge(snippetArr: string[]): SnippetChallenge {
  let c = 0;
  while (c < 1000) {
    c++;
    const characterAt = Math.floor(snippetArr.length * Math.random());
    const char = snippetArr[characterAt];
    if (char === " " || char === "\n") continue;

    const replacement = replaceLetter(char);
    if (replacement !== char) {
      return { characterAt, replacement };
    }
  }

  throw new Error("Unable to find a challenge");
}

function replaceLetter(char: string): string {
  if (char === ".") return ",";
  if (char === ",") return ".";
  if (char === "}") return ")";
  if (char === "{") return "(";
  if (char === ")") return "}";
  if (char === "[") return "{";
  if (char === "]") return "}";
  if (char === "(") return "{";
  if (char === ";") return ":";
  if (char === ":") return ";";
  if (char === ">") return "<";
  if (char === "<") return ">";
  if (char === "u") return "o";
  if (char === "i") return "j";
  if (char === "j") return "i";
  if (char === "p") return "q";
  if (char === "q") return "p";
  if (char === "m") return "n";
  if (char === "n") return "m";
  if (char === "l") return "i";
  if (char === "l") return "i";
  if (char === "v") return "w";
  if (char === "w") return "v";
  if (char === "&") return "?";
  if (char === "a") return oneOf("eb");
  if (char === "e") return oneOf("fr");
  if ("0123456789".includes(char)) return oneOf("0123456789");

  if (/[A-Z]/.test(char)) {
    return replaceLetter(char.toLowerCase()).toUpperCase();
  }
  return char;
}

function oneOf(chars: string) {
  const arr = Array.from(chars);
  return arr[Math.floor(Math.random() * arr.length)];
}
