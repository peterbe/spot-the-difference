import { signInAnonymously } from "firebase/auth";
import { useEffect, useState } from "react";
import { useFirebase } from "./firebase-context";

export function useFirebaseAutoSignIn() {
  const [error, setError] = useState<Error | null>(null);
  const { auth, user } = useFirebase();
  useEffect(() => {
    if (auth && !user) {
      signInAnonymously(auth).catch((err) => {
        setError(err);
      });
    }
  }, [auth, user]);

  return { user, error };
}
