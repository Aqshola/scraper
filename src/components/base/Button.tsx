import React from "react";

type Props = {};

export default function Button({}: Props) {
  return (
    <button className="w-full h-full border-4 border-black font-semibold rounded-2xl bg-primary text-center px-3 py-2 button-shadow active:shadow-none active:translate-y-0.5 focus:border-primary transition-all ">
      Button
    </button>
  );
}
