import { useEffect, useState } from "react";

export function useHasNoHover() {
  const [hasNoHover, setHasNoHover] = useState(false);
  useEffect(() => {
    setHasNoHover(!!window.matchMedia("(hover: none)").matches);
  }, []);
  return hasNoHover;
}
