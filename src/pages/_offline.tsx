import Layout from "@/components/base/Layout";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Custom404({}: Props) {
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="mx-auto flex justify-center items-center h-screen flex-col">
          <div className="text-5xl mb-1">🤨</div>
          <h1 className="text-4xl font-bold text-accent-red">
            Yah, kamu lagi offline nih
          </h1>
          <p className="mt-2 text-lg ">Yuk online biar bisa cari barang lagi</p>
        </div>
      </div>
    </Layout>
  );
}
