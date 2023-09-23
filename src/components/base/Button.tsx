import clsx from "clsx";
import React from "react";

type CustomProps = {
  children: React.ReactNode;
};

type Props = Omit<React.ComponentProps<"button">, keyof CustomProps>;

export default function Button({ children, ...props }: CustomProps & Props) {
  const DEFAULT_CLASS =
    "w-full h-full border-4 border-black font-semibold rounded-2xl bg-primary text-center px-3 py-2 button-shadow active:shadow-none active:translate-y-0.5 focus:border-accent-black transition-all  duration-200 disabled:opacity-50 disabled:bg-accent-grey";
  return (
    <button
      {...props}
      className={clsx(DEFAULT_CLASS, props.className, "focus:-translate-y-1")}
    >
      {children}
    </button>
  );
}
