import { useLocalStorage } from "usehooks-ts";

export function useEnableTimer() {
  const [on, toggle] = useLocalStorage("use-timer", true);
  return [on, toggle] as const;
}
