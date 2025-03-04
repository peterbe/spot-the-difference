import Dexie, { type EntityTable } from "dexie";

export interface DoneChallenge {
  id: number;
  challengeId: string;
  hints: number;
  tookSeconds: number;
  guesses: number;
  gotIt: boolean;
  when: string;
  timer?: boolean;
}

export const db = new Dexie("spot-the-difference") as Dexie & {
  done: EntityTable<
    DoneChallenge,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  done: "++id", // primary key "id" (for the runtime!)
});
