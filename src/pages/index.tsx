import Layout from "@/components/base/Layout";
import CouponDiv from "@/components/base/CouponDiv";
import { Shop, MessageQuestion, SearchNormal1 } from "iconsax-react";

import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

import { identifyBrowser } from "@/libs/fingerprint";
import ProgressBar from "@/components/base/ProgressBar";
import ListProduct from "@/components/searchProduct/ListProduct";
import FormProduct from "@/components/searchProduct/FormProduct";
import { usePagination } from "@/hooks/usePaginate";
import { product } from "@/types/product";
import Pagination from "@/components/base/Pagination";

{
  /**
   * @TODO
   * - add pagination
   * - add modal about
   * - add PWA
   */
}
export default function Home() {
  /** DECLARE */
  const route = useRouter();
  const [pagingArr, currPage, manyPages, setInitialPage, changePage] =
    usePagination<product>(12);
  const paramSearch = route.query.search as string;
  const [fetchLoading, setfetchLoading] = useState(false);
  const headerTitleRef = useRef<HTMLDivElement>(null);

  /** INITIATE FETCHER */
  const getProduct = trpc.product.search.useQuery(
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
  const getLoading = trpc.loading.get.useQuery(undefined, {
    enabled: fetchLoading,
    refetchInterval: 100,
  });

  /** CONSTANT FROM FETCHER */
  const isError = getProduct.isError;
  const isFetching = getProduct.isFetching;
  const productData = getProduct.data;

  const mutateLoading = trpc.loading.set.useMutation();
  const loadingData = getLoading.data;

  /** CONDITION */
  const isShowListProduct = !!pagingArr && !!productData && !fetchLoading;
  const isListProductEmpty = pagingArr.length == 0;

  /** USEEFFECT */
  useEffect(() => {
    identifyBrowser();
    if (productData) {
      setInitialPage(productData || []);
    }
  }, []);

  useEffect(() => {
    if (paramSearch && !productData) {
      getProduct.refetch();
    }
  }, [paramSearch]);

  useEffect(() => {
    let timeout: any;
    if (!isFetching) {
      setInitialPage(productData || []);
      timeout = setTimeout(() => {
        console.log("RESET LOADING");
        mutateLoading.mutate({ value: 0 });
        setfetchLoading(false);
        console.log("RESET LOADING DONE");
      }, 1000);
      getLoading.refetch();
    } else {
      setfetchLoading(true);
    }

    return () => clearTimeout(timeout);
  }, [isFetching]);

  useEffect(() => {
    if (!fetchLoading) {
      getLoading.refetch();
      if (productData && productData?.length > 0) {
        scrollToHeader();
      }
    }
  }, [fetchLoading]);

  /** METHOD */
  function scrollToHeader() {
    const offset_top = headerTitleRef.current?.offsetTop || 0;
    console.log("SCROLLED");
    window.scrollTo({
      top: offset_top - 50,
      behavior: "smooth",
    });
  }

  function setPage(param: number) {
    changePage(param);
    scrollToHeader();
  }

  return (
    <Layout>
      <div className="min-h-screen w-full flex flex-col py-5 px-10">
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
        <div
          className="justify-center mx-auto mt-36 md:mt-64 align-middle"
          ref={headerTitleRef}
        >
          <Link href={"/"}>
            <CouponDiv text={paramSearch ? paramSearch : "CABAR"} />
          </Link>
          <FormProduct initialValue={paramSearch} isLoading={isFetching} />
        </div>

        {/* LOADING */}
        {fetchLoading && (
          <div className="w-fit mx-auto mt-10">
            <div className="w-full animate-width">
              <ProgressBar value={!fetchLoading ? 0 : loadingData} max={100} />
            </div>
          </div>
        )}

        {/* ERROR */}
        {isError && (
          <div className="text-2xl text-center text-accent-red font-semibold mt-5">
            {getProduct.error.message}
          </div>
        )}

        {/* CONTENT */}
        {isShowListProduct && isListProductEmpty && (
          <div className="text-2xl text-center text-accent-red font-semibold">
            Data tidak ditemukan 😔
          </div>
        )}
        {isShowListProduct && !isListProductEmpty && (
          <ListProduct listData={pagingArr} />
        )}

        {isShowListProduct && !isListProductEmpty && (
          <div className="mt-5 flex justify-end">
            <Pagination
              pages={manyPages}
              currentPages={currPage}
              callback={setPage}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
