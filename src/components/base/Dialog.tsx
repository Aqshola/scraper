import React from "react";
import clsx from "clsx";
import { CloseCircle } from "iconsax-react";

type Props = {
  title: String;
  content: React.ReactNode;
  onClose: (param: any) => any;
};

export default function Dialog({ title, content, onClose }: Props) {
  return (
    <div className="bg-white px-3 md:px-6 pt-5 pb-10 rounded-xl max-w-[700px] relative overflow-hidden dialog-shadow">
      <div
        id="card-badge"
        className={clsx(
          "absolute top-0 left-0 radius w-14 h-14 border-r-4 border-b-4 rounded-br-[300px] bg-light-pink border-black"
        )}
      ></div>

      <div className="absolute top-0 right-0 p-4">
        <button onClick={onClose}>
          <CloseCircle size={"30px"} variant="Linear" />
        </button>
      </div>

      <h1 className="text-center text-4xl font-bold mb-5 mt-10">{title}</h1>
      <div className="text-sm md:text-base ">{content}</div>
    </div>
  );
}
