import { useEffect, useState } from "react";

export function Timer({
  started,
  stopped,
  paused,
}: {
  started: Date;
  stopped: Date | null;
  paused: Date | null;
}) {
  return (
    <div>
      {stopped ? (
        <Took started={started} stopped={stopped} />
      ) : paused ? (
        <Paused started={started} />
      ) : (
        <Counting started={started} />
      )}
    </div>
  );
}

function Took({ started, stopped }: { started: Date; stopped: Date }) {
  const seconds = (stopped.getTime() - started.getTime()) / 1000;
  return <p>Took {seconds.toFixed(1)} seconds</p>;
}

function Paused({ started }: { started: Date }) {
  const seconds = Math.ceil((new Date().getTime() - started.getTime()) / 1000);
  return <p>{seconds} seconds</p>;
}

function Counting({ started }: { started: Date }) {
  const [_, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const secondsTotal = Math.floor(
    (new Date().getTime() - started.getTime()) / 1000
  );

  return <p>{secondsTotal} seconds</p>;
}
