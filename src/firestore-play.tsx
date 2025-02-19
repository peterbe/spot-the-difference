import type { User } from "firebase/auth";
import {
  type Firestore,
  addDoc,
  collection,
  query,
  runTransaction,
  where,
  writeBatch,
} from "firebase/firestore";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useFirebase } from "./firebase-context";
import type { DoneChallenge } from "./types";
import { useDoneChallenges } from "./use-done-challenges";
import { useFirebaseAutoSignIn } from "./use-firebase-signin";

async function upsert(db: Firestore, challenges: DoneChallenge[], user: User) {
  // const docRef = await addDoc(collection(db, "plays"), {
  //   myField: "myValue",
  //   anotherField: 123,
  // });

  const collectionRef = collection(db, "plays");

  // const batch = writeBatch(db);

  // .forEach((item) => {
  //   const docRef = doc(collectionRef); // Auto-generate IDs
  //   batch.set(docRef, item);
  // });
  // const docRef = await addDoc(collection(db, "plays"), {
  //       myField: "myValue",
  //       anotherField: 123,
  //       uid: user.uid,
  //     });
  // await batch.commit();

  return runTransaction(db, async (transaction) => {
    const q = query(collectionRef, where("uid", "==", user.uid));
    // const snapshot = await transaction.get(q);

    // console.log("SNAPSHOT:", snapshot);

    // if (snapshot.empty) {
    //   // Document not found, add it
    //   await transaction.add(collectionRef, newData);
    //   console.log(`Document added for ${field}: ${value}`);
    //   return true; // Indicate success
    // } else {
    //   console.log(`Document already exists for ${field}: ${value}`);
    //   return false; // Indicate document exists
    // }
  });
}
export function FirestorePlay() {
  const { db } = useFirebase();
  const { user } = useFirebaseAutoSignIn();
  const { doneChallenges } = useDoneChallenges();
  const [playId, setPlayId] = useLocalStorage<string>("firebase-play-id", "");

  // const sfDocRef = doc(db, "", "SF");

  useEffect(() => {
    // let mounted = true
    if (db && user) {
      console.log("CURRENT USER DONE CHALLENGES:", doneChallenges);
      const unreported = doneChallenges.challenges.filter((c) => !c.firebaseId);
      upsert(db, unreported, user);
    }
    // return () => {
    //   mounted = false
    // }
  }, [db, user, doneChallenges, playId]);
  // useEffect(() => {
  //   console.log("CURRENT USER:", user);
  // }, [auth, user]);
  return null;
}
