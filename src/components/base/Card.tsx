import React from "react";
import Button from "./Button";

type Props = {
  //   name: string;
  //   price: number;
  //   rating: string;
  //   selledItem: string;
  //   location: string;
};

export default function Card() {
  return (
    <div className="bg-white border-4 border-black rounded-2xl px-6 pt-28 pb-5 relative overflow-hidden w-full">
      <div
        id="card-badge"
        className="absolute top-0 left-0 radius w-24 h-24 border-r-4 border-b-4 rounded-br-[300px]  border-black bg-light-orange"
      >
        <div className="h-11 w-11 block bg-gray-400 mt-4 ml-4"></div>
      </div>
      <div id="card-content" className="w-full">
        <div className="flex flex-col content-between">
          <div className="block w-full h-32 rounded-xl bg-red-400"></div>
        </div>
        <div className="mt-2 w-full text-center font-bold text-2xl">
          <h2>Sepatu Adidas</h2>
        </div>
        <div>
          <p className="text-lg font-medium text-center text-accent-grey-2">
            Rp 18.000
          </p>
        </div>
        <div className="text-center">STAR</div>
        <div className="mt-7 text-center font-medium"> 167 Terjual</div>
        <div className="mt-1 font-semibold text-center">Jakarta Surrender</div>
        <div className="pt-3">
          <Button />
        </div>
      </div>
    </div>
  );
}
