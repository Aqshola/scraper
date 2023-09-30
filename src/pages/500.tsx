import Layout from "@/components/base/Layout";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Custom404({}: Props) {
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="mx-auto flex justify-center items-center h-screen flex-col">
          <h1 className="text-4xl font-bold text-accent-red">
            Waduh, webnya lagi rusak nih 😔, bentar ya dibenerin dulu
          </h1>
        </div>
      </div>
    </Layout>
  );
}
