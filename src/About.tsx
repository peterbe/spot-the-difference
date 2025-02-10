import { useNavigate } from "react-router";
import { useDocumentTitle } from "usehooks-ts";
import classes from "./about.module.css";

export function About() {
  useDocumentTitle("About: Spot the Difference");
  const navigate = useNavigate();
  return (
    <div>
      <h2>About Spot the Difference</h2>
      <p>
        Made by <a href="https://www.peterbe.com">peterbe</a>
      </p>
      <p>
        The code is open at{" "}
        <a href="https://github.com/peterbe/spot-the-difference">
          https://github.com/peterbe/spot-the-difference
        </a>
        .<br />
        <a href="https://github.com/peterbe/spot-the-difference/issues/new?template=Blank+issue">
          Go here to file an issue
        </a>{" "}
        if something's not working right.
      </p>
      <p>
        To run it on your laptop, you just need a recent version of{" "}
        <a href="https://bun.sh/">Bun</a>.
        <br />
        In fact, this is how you run it:
      </p>
      <ol>
        <li>
          <code>
            git clone https://github.com/peterbe/spot-the-difference.git
          </code>
        </li>
        <li>
          <code>cd spot-the-diffence</code>
        </li>
        <li>
          <code>bun install</code>
        </li>
        <li>
          <code>bun run dev</code>
        </li>
        <li>
          <code>open http://localhost:3000</code> (in another terminal)
        </li>
      </ol>

      <div className={classes.banner}>
        <button
          type="button"
          onClick={() => {
            navigate("/play");
          }}
        >
          Start!
        </button>
      </div>
    </div>
  );
}
