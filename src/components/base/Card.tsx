import React from "react";
import Button from "./Button";
import Rating from "./Rating";
import { Location } from "iconsax-react";
import Image from "next/image";
import {
  amountFormatter,
  shopeeHandleSelledItem,
} from "@/helpers/common/parsing";
import { platform } from "os";
import Link from "next/link";

type Props = {
  name: string;
  price: number;
  rating: string;
  selledItem: string;
  location: string;
  img: string;
  platform: "shopee" | "tokopedia";
  link: string;
};

export default function Card(props: Props) {
  return (
    <div className="bg-white border-4 border-black rounded-2xl px-6 pt-24 pb-5 relative overflow-hidden w-full">
      <div
        id="card-badge"
        className="absolute top-0 left-0 radius w-24 h-24 border-r-4 border-b-4 rounded-br-[300px]  border-black bg-light-orange"
      >
        <div className="h-11 w-11 flex  mt-4 ml-4 relative">
          <Image
            className="object-contain"
            src={`/icon/${props.platform}.png`}
            fill
            alt={props.platform}
          />
        </div>
      </div>
      <div id="card-content" className="w-full">
        <div className="flex flex-col content-between">
          <div className="block w-full h-44 relative">
            <Image
              className="object-contain"
              src={props.img}
              fill
              alt="baju"
              sizes="176px"
            />
          </div>
        </div>
        <div className="mt-2 w-full text-ellipsis h-40 max-h-40 overflow-hidden text-center font-bold text-2xl">
          <h2>{props.name}</h2>
        </div>
        <div>
          <p className="text-xl font-medium text-center text-accent-grey-2 mt-1">
            {amountFormatter(props.price)}
          </p>
        </div>
        <div className="flex mt-3 lex justify-center">
          <Rating count={Number(props.rating)} />
        </div>

        {/**
         * @NOTE handle format terjual
         *
         */}
        <div className="mt-7 text-center font-medium">
          {props.platform == "shopee" &&
            shopeeHandleSelledItem(Number(props.selledItem))}
          {props.platform == "tokopedia" && props.selledItem}
        </div>
        <div className="mt-1 font-semibold text-center flex justify-center gap-2">
          <i>
            <Location variant="Outline" />
          </i>{" "}
          <span>{props.location}</span>
        </div>
        <div className="mt-5">
          <Link href={props.link} target="blank" rel="noopener noreferrer">
            <Button>Cek Barang</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
