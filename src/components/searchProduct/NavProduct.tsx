import React, { useEffect, useRef, useState } from "react";
import { Shop, MessageQuestion, SearchNormal1 } from "iconsax-react";
import { isClient, useShowDialog } from "@/helpers/ui";
type Props = {
  installPrompt: any;
};

export default function NavProduct({ installPrompt }: Props) {
  let localNavigation: any;
  const [isOpenInPWA, setisOpenInPWA] = useState(false);

  if (isClient) {
    localNavigation = window.navigator;
  }
  const { showDialog } = useShowDialog();
  const ContentAbout = () => (
    <p className="text-sm md:text-base te">
      <b>Cabar</b> merupakan sebuah platform untuk mencari sebuah barang dari
      beberapa e-commerce sehingga memudahkan customer dalam mencari dan
      membandingkan barang yang diinginkan. Data yang digunakan diperoleh
      melalui hasil scraping dari e-commerce yang dituju. sejauh ini{" "}
      <b>Cabar</b> dapat memberikan data dari{" "}
      <span className="font-bold bg-light-orange">Shopee</span>,{" "}
      <span className="font-bold bg-light-green">Tokopedia</span> dan{" "}
      <span className="font-bold bg-light-blue">Blibli</span>
    </p>
  );

  const ContentPWA = () => (
    <div className="text-sm md:text-base">
      <p>
        <b>Cabar</b> sudah mendukung PWA, untuk melakukan instalasi PWA dapat
        dilakukan sebagai berikut
      </p>
      <ol className="list-decimal list-inside">
        <li>Pada desktop dapat menekan tombol instalasi pada address bar</li>
        <li>
          Pada mobile dapat menekan tombol install aplikasi pada saat membuka
          tab detail browser
        </li>
      </ol>
    </div>
  );

  const ContentInstalledPWA = () => (
    <p className="text-sm md:text-base">
      Yeyyy selamat, <b>Cabar</b> udah kepasang nih dihape kamu
    </p>
  );

  useEffect(() => {
    setisOpenInPWA(checkIsOpenInPWA());
  }, []);

  /** METHOD */
  function showAbout() {
    showDialog("Tentang", <ContentAbout />);
  }

  async function showConfirmPWA() {
    const isInstalledPWA = await checkInstalledPWA();

    if (isInstalledPWA) {
      showDialog("PWA", <ContentInstalledPWA />);
    } else {
      showDialog("PWA", <ContentPWA />, initPrompt);
    }
  }

  async function initPrompt() {
    if (installPrompt) {
      await installPrompt.prompt();
    }
  }

  async function checkInstalledPWA() {
    const relatedApps = await localNavigation.getInstalledRelatedApps();
    return relatedApps.length > 0;
  }

  function checkIsOpenInPWA() {
    return ["fullscreen", "standalone", "minimal-ui"].some(
      (displayMode) =>
        window.matchMedia("(display-mode: " + displayMode + ")").matches
    );
  }

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={showAbout}
        className="hover:bg-primary p-1 transition-all rounded-2xl hover:-translate-y-1"
      >
        <MessageQuestion variant="Bold" />
      </button>
      <p className="text-sm  w-full text-center font-semibold">
        Cari dan banding harga barang
      </p>
      {!isOpenInPWA && (
        <button
          onClick={showConfirmPWA}
          className="hover:bg-primary p-1 transition-all rounded-2xl hover:-translate-y-1"
        >
          <Shop variant="Bold" />
        </button>
      )}
    </div>
  );
}
