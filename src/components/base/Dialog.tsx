import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { CloseCircle } from "iconsax-react";

type Props = {
  title: String;
  content: React.ReactNode;
  onClose: (param?: any) => any;
};

export default function Dialog({ title, content, onClose }: Props) {
  const [hide, setHide] = useState(false);

  function handleClose() {
    setHide(true);
    setTimeout(() => {
      onClose();
    }, 200);
  }

  return (
    <div
      className={clsx(
        "border-4 border-black bg-white px-3 md:px-6 pt-5 pb-10 rounded-xl max-w-[700px] relative overflow-hidden dialog-shadow animate-scale",
        hide && "animate-scale-hide"
      )}
    >
      <div
        id="card-badge"
        className={clsx(
          "absolute top-0 left-0 radius w-14 h-14 border-r-4 border-b-4 rounded-br-[300px] bg-light-pink border-black"
        )}
      ></div>

      <div className="absolute top-0 right-0 p-4">
        <button onClick={handleClose}>
          <CloseCircle size={"30px"} variant="Linear" />
        </button>
      </div>

      <h1 className="text-center text-4xl font-bold mb-5 mt-10">{title}</h1>
      <div className="text-sm md:text-base ">{content}</div>
    </div>
  );
}
