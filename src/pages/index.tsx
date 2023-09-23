import Layout from "@/components/base/Layout";
// import Card from "@/components/searchProduct/Card";
import Card from "@/components/base/Card";
import CouponDiv from "@/components/base/CouponDiv";
import { Shop, MessageQuestion, SearchNormal1 } from "iconsax-react";

import { product } from "@/types/product";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Input from "@/components/base/Input";
import Button from "@/components/base/Button";
import { identifyBrowser } from "@/helpers/clients/fingerprint";

export default function Home() {
  const route = useRouter();
  const paramSearch = route.query.search as string;
  const [search, setSearch] = useState<string>(paramSearch || "");
  const [browserId, setBrowserId] = useState("");

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
    const generated_browser_id = identifyBrowser();
    setBrowserId(generated_browser_id);
  }, []);

  useEffect(() => {
    if (paramSearch) {
      product.refetch();
    }
  }, [paramSearch]);

  {
    /**
     * @TODO
     * - add pagination
     * - add handler terjual
     * - add progress bar (front and back)
     * - add modal about
     * - add PWA
     */
  }

  return (
    <Layout>
      <div className="min-h-screen w-full flex flex-col py-5 px-5">
        {/* NAV */}
        <div className="flex justify-between">
          <button>
            <MessageQuestion variant="Bold" />
          </button>
          <p className="text-sm font-semibold">Cari dan banding harga barang</p>
          <button>
            <Shop variant="Bold" />
          </button>
        </div>

        {/* HEADER */}
        <div className="justify-center mx-auto mt-64 align-middle">
          <Link href={"/"}>
            <CouponDiv text={paramSearch ? paramSearch : "CABAR"} />
          </Link>
          <form
            className="grid grid-cols-4 mt-4 gap-3"
            onSubmit={searchProduct}
          >
            <div className="col-span-3">
              <Input
                append={<SearchNormal1 />}
                onChange={(e) => setSearch(e.target.value)}
                required
                value={search}
              />
            </div>
            <div className="col-span-1">
              <Button disabled={isFetching}>Cari</Button>
            </div>
          </form>
        </div>

        {/* LOADING */}
        {isFetching && (
          <div className="text-2xl text-center text-light-blue font-semibold">
            Loading . . .
          </div>
        )}

        {/* ERROR */}
        {isError && (
          <div className="text-2xl text-center text-accent-red font-semibold mt-5">
            {product.error.message}
          </div>
        )}

        {/* CONTENT */}
        {isDataExist && product.data.length <= 0 && (
          <div className="text-2xl text-center text-accent-red font-semibold">
            Data tidak ditemukan 😔
          </div>
        )}
        {isDataExist && product.data.length > 0 && (
          <div className="mt-10 grid grid-cols-12 justify-center gap-4">
            {product.data.map((data: product) => (
              <div className="col-span-3 h-max" key={data.id}>
                <Card
                  price={data.price}
                  img={data.photo_link}
                  name={data.name}
                  rating={data.rating}
                  location={data.shop_location}
                  platform={data.platform}
                  selledItem={data.selled_item}
                  link={data.url}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
