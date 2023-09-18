import Layout from "@/components/base/Layout";
import Card from "@/components/searchProduct/Card";
import CouponDiv from "@/components/base/CouponDiv";
import { Shop, MessageQuestion } from "iconsax-react";

import { product } from "@/types/product";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const route = useRouter();
  const paramSearch = route.query.search as string;
  const [search, setSearch] = useState<string>(paramSearch);
  const product = trpc.searchProduct.useQuery(
    { text: paramSearch },
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

  const isError = product.isError;
  const isFetching = product.isFetching;
  const isDataExist = product.data;

  function searchProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    route.push({
      query: {
        search,
      },
    });

    setSearch("");
  }

  useEffect(() => {
    if (paramSearch) {
      product.refetch();
    }
  }, [paramSearch]);

  return (
    <Layout>
      <div className="min-h-screen w-full flex flex-col py-2 px-5">
        <div className="flex justify-between">
          <button>
            <MessageQuestion variant="Bold" />
          </button>
          <p className="text-sm font-semibold">Cari dan banding harga barang</p>
          <button>
            <Shop variant="Bold" />
          </button>
        </div>
        <CouponDiv
          text="CABAR"
          className="justify-center m-auto align-middle"
        />
      </div>
      {/* <Link href={"/"}>
        <h1>Scraper</h1>
      </Link>
      <form onSubmit={searchProduct}>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          required
        />
        <button>Search</button>

        {paramSearch && (
          <h1 style={{ marginBottom: "20px" }}>
            Search value for {paramSearch}
          </h1>
        )}
        {isError && <div>Error Happens :{product.error.message}</div>}

        {isFetching && <div>Getting Data</div>}

        {isDataExist && product.data.length == 0 && <p>Data not found :(</p>}
        {isDataExist && (
          <div
            style={{
              marginTop: "30px",
              width: "100%",
              minHeight: "100vh",
              display: "grid",
              gridTemplateColumns: "repeat(5,230px)",
              justifyContent: "space-between",
            }}
          >
            {product.data?.map((el: product) => (
              <div
                key={el.id}
                style={{
                  marginBottom: "20px",
                }}
              >
                <Card
                  photo={el.photo_link}
                  link={el.url}
                  location={el.shop_location}
                  name={el.name}
                  price={el.price}
                />
              </div>
            ))}
          </div>
        )}
      </form> */}
    </Layout>
  );
}
