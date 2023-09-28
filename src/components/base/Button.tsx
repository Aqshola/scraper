import clsx from "clsx";
import React from "react";

type CustomProps = {
  children: React.ReactNode;
  size?: "sm" | "md";
  variant?: "primary" | "blank";
};

type Props = Omit<React.ComponentProps<"button">, keyof CustomProps>;

export default function Button({
  children,
  size = "md",
  variant = "primary",
  ...props
}: CustomProps & Props) {
  const classObject = {
    sm: "button-shadow-sm text-sm rounded-xl",
    md: "px-3 py-2 text-md button-shadow-md rounded-2xl ",
  };

  const variantObject = {
    blank: "bg-white",
    primary: "bg-primary",
  };

  return (
    <button
      {...props}
      className={clsx(
        `w-full h-full border-4 border-black font-semibold 
        bg-primary text-center 
         button-shadow active:shadow-none 
        active:translate-y-0.5 focus:border-accent-black 
        transition-all duration-200 disabled:opacity-50 
        disabled:bg-accent-grey focus:-translate-y-1 hover:-translate-y-1`,
        props.className,
        classObject[size],
        variantObject[variant]
      )}
    >
      {children}
    </button>
  );
}
