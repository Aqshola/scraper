import React, { ReactNode } from "react";

type CustomProps = {
  append?: ReactNode;
};

type Props = Omit<React.ComponentProps<"input">, keyof CustomProps>;

export default function Input({ append, ...props }: Props & CustomProps) {
  return (
    <div className="rounded-lg border-4 px- py-2  border-black flex align-middle overflow-hidden bg-white input-shadow focus-within:border-primary focus-within:shadow-none focus-within:-translate-y-1 transition-all">
      {append && <div className="px-2">{append}</div>}
      <input
        {...props}
        placeholder="Nama Produk"
        className="w-full h-full px-2 bg-transparent focus:outline-none"
      />
    </div>
  );
}
