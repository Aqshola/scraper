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
import { useShowDialog } from "@/helpers/ui";

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
  const { showDialog } = useShowDialog();
  const paramSearch = route.query.search as string;
  const [fetchLoading, setfetchLoading] = useState(false);
  const headerTitleRef = useRef<HTMLDivElement>(null);
  const installPromp = useRef<any>(null);

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

  /** CONSTANT LOCAL */
  const ContentAbout = () => (
    <p className="text-sm md:text-base te">
      <b>Cabar</b> merupakan sebuah platform untuk mencari sebuah barang dari
      beberapa e-commerce sehingga memudahkan customer dalam mencari dan
      membandingkan barang yang diinginkan. Data yang digunakan diperoleh
      melalui hasil scraping dari e-commerce yang dituju. sejauh ini{" "}
      <b>Cabar</b> dapat memberikan data dari{" "}
      <span className="font-bold bg-light-orange">Shopee</span> dan{" "}
      <span className="font-bold bg-light-green">Tokopedia</span>
    </p>
  );

  const ContentPWA = () => (
    <p className="text-sm md:text-base">
      <b>Cabar</b> sudah mendukung PWA, untuk melakukan instalasi PWA cukup
      tekan tombol instalasi di address bar dan lakukan konfirmasi instalasi
    </p>
  );

  /** USEEFFECT */
  useEffect(() => {
    identifyBrowser();
    if (productData) {
      setInitialPage(productData || []);
    }

    window.addEventListener("beforeinstallprompt", (evt) => {
      evt.preventDefault();
      installPromp.current = evt;
    });
  }, []);

  useEffect(() => {
    if (paramSearch && !productData) {
      getProduct.refetch();
    }
    if (!paramSearch) {
      mutateLoading.mutate({ value: 0 });
    }
  }, [paramSearch]);

  useEffect(() => {
    let timeout: any;
    if (!isFetching) {
      setInitialPage(productData || []);
      timeout = setTimeout(() => {
        mutateLoading.mutate({ value: 0 });
        setfetchLoading(false);
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
    window.scrollTo({
      top: offset_top - 50,
      behavior: "smooth",
    });
  }

  function setPage(param: number) {
    changePage(param);
    scrollToHeader();
  }

  function showAbout() {
    showDialog("Tentang", <ContentAbout />);
  }

  async function showConfirmPWA() {
    showDialog("PWA", <ContentPWA />);
    if (installPromp.current) {
      await installPromp.current.prompt();
    }
  }

  return (
    <Layout>
      <div className="min-h-screen w-full flex flex-col py-5 px-2 md:px-10">
        {/* NAV */}
        <div className="flex justify-between">
          <button
            onClick={showAbout}
            className="hover:bg-primary p-1 transition-all rounded-2xl hover:-translate-y-1"
          >
            <MessageQuestion variant="Bold" />
          </button>
          <p className="text-sm font-semibold">Cari dan banding harga barang</p>
          <button
            onClick={showConfirmPWA}
            className="hover:bg-primary p-1 transition-all rounded-2xl hover:-translate-y-1"
          >
            <Shop variant="Bold" />
          </button>
        </div>

        {/* HEADER */}
        <div
          className="justify-center flex flex-col mx-auto mt-14 md:mt-64 items-center md:items-stretch"
          ref={headerTitleRef}
        >
          <Link href={"/"}>
            <CouponDiv text={paramSearch ? paramSearch : "CABAR"} />
          </Link>
          <div>
            <FormProduct initialValue={paramSearch} isLoading={isFetching} />
          </div>
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
            {isError && <span>Yah, lagi ada error nih maaf ya 😣</span>}
          </div>
        )}

        {/* CONTENT */}
        {isShowListProduct && isListProductEmpty && (
          <div className="text-2xl text-center text-accent-red font-semibold mt-10">
            Yah, barang yang kamu cari gak ketemu 😣
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
