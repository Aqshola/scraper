import Head from "next/head";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Custom404({}: Props) {
  return (
    <>
      <Head>
        <title>😣 Notfound</title>
      </Head>
      <div className="min-h-screen bg-light-pastel">
        <div className="mx-auto flex justify-center items-center h-screen flex-col">
          <div className="text-5xl mb-1">🤨</div>
          <h1 className="text-4xl font-bold text-accent-red">
            Hayooo mau kemana
          </h1>
          <p className="mt-2 text-lg ">
            Gaada apa-apa disini,{" "}
            <Link
              className="bg-primary font-bold p-1 rounded-lg text-base border-2 border-black"
              href={"/"}
            >
              yuk balik aja
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
}
