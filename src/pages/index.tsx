import Layout from "@/components/base/Layout";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const product = trpc.searchProduct.useQuery({ text: "Baju Anak anak" });
  if (product.isFetching) return <div>Loading...</div>;
  if (product.isError) return <div>Error {product.error.message}</div>;

  return (
    <Layout>
      <p>
        You search for <b>{product.data}</b>
      </p>
    </Layout>
  );
}
