import React from "react";
import Button from "../base/Button";
import Rating from "../base/Rating";
import { Location } from "iconsax-react";
import Image from "next/image";
import { amountFormatter, shopeeHandleSelledItem } from "@/helpers/parsing";
import Link from "next/link";
import clsx from "clsx";

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
  let selled_item_label = props.selledItem;

  if (props.platform == "shopee") {
    if (props.selledItem == "0") {
      selled_item_label = "Belum terjual";
    } else {
      selled_item_label = shopeeHandleSelledItem(
        Number(props.selledItem)
      ) as "string";
    }
  }
  return (
    <div className="bg-white border-4 border-black rounded-2xl px-6 pt-14 pb-5 relative overflow-hidden w-full h-full card-shadow">
      <div
        id="card-badge"
        className={clsx(
          "absolute top-0 left-0 radius w-14 h-14 border-r-4 border-b-4 rounded-br-[300px]  border-black",
          props.platform == "shopee" && "bg-light-orange",
          props.platform == "tokopedia" && "bg-light-green"
        )}
      >
        <div className="h-7 w-7 flex  mt-2 ml-2 relative">
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
        <div className="mt-2 w-full text-ellipsis text-left text-sm line-clamp-2">
          <h2>{props.name}</h2>
        </div>
        <div>
          <p className="text-md text-left font-bold text-black-2 mt-1">
            {amountFormatter(props.price)}
          </p>
        </div>
        <div className="mt-2">
          <Rating count={Number(props.rating)} />
        </div>
        <div className="mt-5 text-left text-xs font-medium text-accent-grey">
          {selled_item_label}
        </div>
        <div className="mt-1 text-left md:text-center flex gap-1 text-xs text-accent-grey">
          <i>
            <Location variant="Outline" size={15} />
          </i>{" "}
          <span>{props.location}</span>
        </div>
        <div className="mt-5">
          <Link href={props.link} target="blank" rel="noopener noreferrer">
            <Button size="sm">Cek Barang</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
