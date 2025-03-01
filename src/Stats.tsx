import {
  type Timestamp,
  collection,
  getCountFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocumentTitle } from "usehooks-ts";
import { Promo } from "./Promo";
import { WithShimmerEffect } from "./WithSimmerEffect";
import type { DoneChallenge } from "./db";
import { useFirebase } from "./firebase-context";
import playClasses from "./play.module.css";
import { SNIPPETS } from "./snippets";
import classes from "./stats.module.css";
import { useFirebaseAutoSignIn } from "./use-firebase-signin";

type UnsubscribeType = ReturnType<typeof onSnapshot>;

type DoneChallengeFirestore = Omit<DoneChallenge, "id"> & {
  _createdAt: Timestamp;
  _user: string;
};
type ByChallengeId = Record<string, DoneChallengeFirestore[]>;

export function Stats() {
  useDocumentTitle("Stats: Spot the Difference");

  const { firestore } = useFirebase();
  const { user } = useFirebaseAutoSignIn();
  const [totalEveryone, setTotalEveryone] = useState<number | null>(null);
  const [totalYou, setTotalYou] = useState<number | null>(null);
  const [byChallengeId, setByChallengeId] = useState<ByChallengeId>({});

  useEffect(() => {
    let mounted = true;
    const unsubscribes: UnsubscribeType[] = [];
    if (firestore) {
      const coll = collection(firestore, "plays");
      getCountFromServer(coll).then((snapshot) => {
        if (mounted) setTotalEveryone(snapshot.data().count);
      });
      if (user) {
        const coll = collection(firestore, "plays");
        const q = query(coll, where("_user", "==", user.uid));
        getCountFromServer(q).then((snapshot) => {
          if (mounted) setTotalYou(snapshot.data().count);
        });
      }

      const q = query(
        coll,
        where("timer", "==", true),
        orderBy("_createdAt", "desc"),
        limit(1000),
      );

      unsubscribes.push(
        onSnapshot(q, (querySnapshot) => {
          const byChallengeId: ByChallengeId = {};
          // biome-ignore lint/complexity/noForEach: it's firestore's api
          querySnapshot.forEach((doc) => {
            const challenge = doc.data() as DoneChallengeFirestore;
            if (!(challenge.challengeId in byChallengeId)) {
              byChallengeId[challenge.challengeId] = [];
            }
            byChallengeId[challenge.challengeId].push(challenge);
          });
          setByChallengeId(byChallengeId);
        }),
      );
    }
    return () => {
      mounted = false;
      for (const unsubscribe of unsubscribes) {
        unsubscribe();
      }
    };
  }, [firestore, user]);

  const byChallengeIdByTookSeconds: [string, number[], number][] = [];
  for (const [challengeId, plays] of Object.entries(byChallengeId)) {
    if (plays.length < 3) continue;
    const candidates = plays
      .filter((play) => play.gotIt)
      .map((play) => play.tookSeconds);
    const m = medium(candidates);
    if (m) {
      byChallengeIdByTookSeconds.push([challengeId, candidates, m]);
    }
  }
  byChallengeIdByTookSeconds.sort((a, b) => b[2] - a[2]);

  return (
    <div>
      <h2>Stats</h2>

      <div className="grid">
        <Stat
          title="Total number of challenges done, ever"
          number={totalEveryone}
        />
        <Stat
          title="Total number of challenges done, by you"
          number={totalYou}
        />
      </div>
      <hgroup>
        <h3>Hardest challenges</h3>
        <p>With timer, that got it right eventually</p>
      </hgroup>

      {byChallengeIdByTookSeconds.map(([challengeId, candidates, median]) => {
        if (!challengeId || !median) return null;
        const snippet = SNIPPETS.get(challengeId);
        if (!snippet) return null;
        return (
          <article key={challengeId}>
            <pre className={playClasses.snippets}>{snippet.text}</pre>
            <footer>
              Seconds {median.toFixed(1)} seconds, {candidates.length} plays
            </footer>
          </article>
        );
      })}
      <Promo />
    </div>
  );
}

function Stat({ title, number }: { title: string; number: number | null }) {
  return (
    <article style={{ textAlign: "center" }}>
      <header>{title}</header>
      <Num number={number} />
    </article>
  );
}

function Num({ number }: { number: number | null }) {
  if (number === null) {
    return (
      <WithShimmerEffect>
        <h3 className={classes.number}>???</h3>
      </WithShimmerEffect>
    );
  }
  return <h3 className={classes.number}>{number}</h3>;
}

function medium(numbers: number[]): number | null {
  if (numbers.length === 0) return null;
  const sorted = numbers.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}
