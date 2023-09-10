import Layout from "@/components/base/Layout";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState<string>("baju baru");
  const product = trpc.searchProduct.useQuery(
    { text: search },
    {
      refetchIntervalInBackground: false,
      retry: false,
      retryOnMount: false,
    }
  );

  function searchProduct() {
    // product.refetch();
  }

  if (product.isError) return <div>Error {product.error.message}</div>;
  if (product.isFetching) return <div>Loading...</div>;

  if (product.data) {
    console.log(product.data);
  }
  return (
    <Layout>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button onClick={searchProduct}>Search</button>
    </Layout>
  );
}
