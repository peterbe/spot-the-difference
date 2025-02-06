import { useLocalStorage } from "usehooks-ts";

export function useAudio() {
  const [audioOn, setAudioOn] = useLocalStorage("audio-on", true);
  return [audioOn, setAudioOn] as const;
}
