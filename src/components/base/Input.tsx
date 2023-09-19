import React, { ReactNode } from "react";

type Props = {
  append?: ReactNode;
};

export default function Input(props: Props) {
  return (
    <div className="rounded-lg border-4 px- py-2  border-black flex align-middle overflow-hidden bg-white input-shadow focus-within:border-primary focus-within:shadow-none transition-all">
      {props.append && <div className="px-2">{props.append}</div>}
      <input
        placeholder="Nama Produk"
        className="w-full h-full px-2 bg-transparent focus:outline-none"
      />
    </div>
  );
}
