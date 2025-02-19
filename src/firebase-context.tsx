import {
  type Auth,
  type User,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { type Firestore, getFirestore } from "firebase/firestore";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { app } from "./firebase-app";

type FirebaseContext = {
  user: User | null | false; // null means not signed in, false means loading
  auth: Auth | null;
  db: Firestore | null;
};
export const FirebaseContext = createContext<FirebaseContext>({
  user: false,
  auth: null,
  db: null,
});

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <FirebaseContext.Provider value={{ user, auth, db }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export function useFirebase() {
  return useContext(FirebaseContext);
}
