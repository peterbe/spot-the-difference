import { useEffect, useState } from "react";

export function Timer({
  started,
  stopped,
}: {
  started: Date;
  stopped?: Date | null;
}) {
  return (
    <div>
      {stopped ? <Took started={started} stopped={stopped} /> : <Counting />}
    </div>
  );
}

function Took({ started, stopped }: { started: Date; stopped: Date }) {
  const seconds = (stopped.getTime() - started.getTime()) / 1000;
  return <p>Took {seconds.toFixed(1)} seconds</p>;
}

function Counting() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <p>{seconds} seconds</p>;
}
