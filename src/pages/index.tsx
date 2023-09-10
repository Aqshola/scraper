import Layout from "@/components/base/Layout";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const route = useRouter();
  const [search, setSearch] = useState<string>("");
  const product = trpc.searchProduct.useQuery(
    { text: search },
    {
      refetchIntervalInBackground: false,
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: false,
    }
  );

  function searchProduct() {
    route.push({
      query: {
        search,
      },
    });
    product.refetch();
  }

  if (product.isError) return <div>Error {product.error.message}</div>;
  if (product.isFetching) return <div>Getting data...</div>;

  return (
    <Layout>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button onClick={searchProduct}>Search</button>

      <table border={1} cellSpacing={5} style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Platform</th>
          </tr>
        </thead>
        <tbody>
          {product.data?.map((el) => (
            <tr key={el.name}>
              <td>{el.name}</td>
              <td>{el.platform}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
