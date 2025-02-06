import { useLocalStorage } from "usehooks-ts";
import type { DoneMemory } from "./types";

export function useDoneChallenges() {
  const [doneChallenges, setDoneChallenges, removeDoneChallenges] =
    useLocalStorage<DoneMemory>("done-challenges", {
      challenges: [],
    });

  return { doneChallenges, setDoneChallenges, removeDoneChallenges };
}
