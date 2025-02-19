import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { type DoneChallenge, db } from "./db";
// import { useLocalStorage } from "usehooks-ts";
// import type { DoneChallenge } from "./types";

type LegacyDoneChallenge = Omit<DoneChallenge, "id"> & { id: string };
type LegacyDoneMemory = {
  challenges: LegacyDoneChallenge[];
};

export function useDoneChallenges() {
  const doneChallenges = useLiveQuery(() => db.done.toArray());
  const [legacy_doneChallenges, _, legacy_removeDoneChallenges] =
    useLocalStorage<LegacyDoneMemory>("done-challenges", {
      challenges: [],
    });

  useEffect(() => {
    console.log(
      "LEGACY DONE",
      legacy_doneChallenges.challenges,
      "COMPARE WITH",
      doneChallenges,
    );
    if (legacy_doneChallenges.challenges.length) {
      console.log("MIGRATING DONE CHALLENGES", doneChallenges);
      const toMigrate = legacy_doneChallenges.challenges.map(
        (challenge: LegacyDoneChallenge) => {
          return {
            challengeId: challenge.id,
            hints: challenge.hints,
            tookSeconds: challenge.tookSeconds,
            guesses: challenge.guesses,
            gotIt: challenge.gotIt,
            when: challenge.when,
          };
        },
      );
      db.done.bulkAdd(toMigrate);
      // legacy_removeDoneChallenges();
    }
  }, [legacy_doneChallenges, doneChallenges, legacy_removeDoneChallenges]);

  async function addDoneChallenge(challenge: Omit<DoneChallenge, "id">) {
    // console.warn("ADD DONE", challenge);
    await db.done.add(challenge);
  }

  async function removeDoneChallenges() {
    await db.done.clear();
  }

  return { doneChallenges, addDoneChallenge, removeDoneChallenges };
}
