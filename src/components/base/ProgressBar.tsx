import React from "react";
import clsx from "clsx";

type CustomProps = {};
type Props = Omit<React.ComponentProps<"progress">, keyof CustomProps>;

export default function ProgressBar({ className, ...props }: Props) {
  return <progress {...props} className={clsx("custom-progress", className)} />;
}
