import classes from "./settings.module.css";

import { useAudio } from "./use-audio-on";
import { useDoneChallenges } from "./use-done-challenges";

export function Settings() {
  const [audioOn, setAudioOn] = useAudio();
  const { removeDoneChallenges } = useDoneChallenges();
  return (
    <div className={`grid ${classes.settings}`}>
      <div>
        <fieldset>
          <label>
            <input
              name="audio"
              type="checkbox"
              role="switch"
              aria-checked={audioOn}
              checked={audioOn}
              onChange={() => {
                setAudioOn((was) => !was);
              }}
            />{" "}
            Sounds on
          </label>
        </fieldset>
      </div>
      <div>
        <button
          type="button"
          className="outline secondary"
          style={{ fontSize: "70%" }}
          onClick={() => {
            removeDoneChallenges();
          }}
        >
          Reset done challenges
        </button>
      </div>
    </div>
  );
}
