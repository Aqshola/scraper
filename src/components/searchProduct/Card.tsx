import { amountFormatter } from "@/helpers/common/parsing";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  name: string;
  price: number;
  location: string;
  link: string;
  photo: string;
};
function Card(props: Props) {
  return (
    <div
      style={{
        padding: "5px",
        border: "1px solid black",
        borderRadius: "50",
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <Image
          src={props.photo}
          alt={props.name}
          height={100}
          width={100}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </div>
      <h1 style={{ fontSize: "15px", textOverflow: "ellipsis" }}>
        {props.name}
      </h1>
      <h2 style={{ fontSize: "15px" }}>{amountFormatter(props.price)}</h2>
      <h3 style={{ fontSize: "10px" }}>{props.location}</h3>
      <Link target="_blank" href={props.link}>
        Visit
      </Link>
    </div>
  );
}

export default Card;
