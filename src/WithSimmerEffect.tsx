import { clsx } from "clsx";
import type { ReactNode } from "react";

import styles from "./WithShimmerEffect.module.css";

interface WithShimmerEffectProps {
  children: ReactNode;
  className?: string;
}

export const WithShimmerEffect = ({
  children,
  className,
}: WithShimmerEffectProps) => {
  return <div className={clsx(styles.shimmerText, className)}>{children}</div>;
};
