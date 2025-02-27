import { useLocalStorage } from "usehooks-ts";

export function useTimer() {
  const [on, toggle] = useLocalStorage("use-timer", true);
  return [on, toggle] as const;
}
