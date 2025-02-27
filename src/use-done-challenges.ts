import { useLiveQuery } from "dexie-react-hooks";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { type DoneChallenge, db } from "./db";
import { useFirebase } from "./firebase-context";
import { useFirebaseAutoSignIn } from "./use-firebase-signin";

type LegacyDoneChallenge = Omit<DoneChallenge, "id"> & { id: string };
type LegacyDoneMemory = {
  challenges: LegacyDoneChallenge[];
};

let bulkMigrated = false;

export function useDoneChallenges() {
  const { firestore } = useFirebase();
  const { user } = useFirebaseAutoSignIn();

  const doneChallenges = useLiveQuery(() => db.done.toArray());
  const [legacy_doneChallenges, _, legacy_removeDoneChallenges] =
    useLocalStorage<LegacyDoneMemory>("done-challenges", {
      challenges: [],
    });

  useEffect(() => {
    if (
      legacy_doneChallenges.challenges.length &&
      doneChallenges &&
      !bulkMigrated
    ) {
      const doneChallengesIds = new Set(
        doneChallenges.map((challenge) => challenge.challengeId),
      );

      const toMigrate = legacy_doneChallenges.challenges
        .filter((challenge) => {
          return !doneChallengesIds.has(challenge.id);
        })
        .map((challenge: LegacyDoneChallenge) => {
          return {
            challengeId: challenge.id,
            hints: challenge.hints,
            tookSeconds: challenge.tookSeconds,
            guesses: challenge.guesses,
            gotIt: challenge.gotIt,
            when: challenge.when,
            timer: true,
          };
        });
      if (toMigrate.length) {
        bulkMigrated = true; // to guard against double-fires of effect
        db.done.bulkAdd(toMigrate);
        legacy_removeDoneChallenges();
      }
    }
  }, [legacy_doneChallenges, doneChallenges, legacy_removeDoneChallenges]);

  async function addDoneChallenge(challenge: Omit<DoneChallenge, "id">) {
    // db.done.add() will mutate the `challenge` and inject an `id` property
    await db.done.add(challenge);
    if (user && firestore) {
      const { id, ...pure } = challenge as DoneChallenge;
      await addDoc(collection(firestore, "plays"), {
        ...pure,
        _user: user.uid,
        _createdAt: serverTimestamp(),
      });
    }
  }

  async function removeDoneChallenges() {
    await db.done.clear();
  }

  return { doneChallenges, addDoneChallenge, removeDoneChallenges };
}
