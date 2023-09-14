import { shopee, tokopedia } from "@/helpers/servers/scraper";
import { procedure, router } from "@/server";
import { z } from "zod";
import puppeteer from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import { retryFunction } from "@/helpers/servers/helper";
import { listOfProduct } from "@/types/product";

export const appRouter = router({
  searchProduct: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (opts) => {
      puppeteer.use(stealthPlugin());
      const search_value = opts.input.text;
      const browser = await puppeteer.launch({
        headless: true,
        timeout: 15000,
        defaultViewport: null,
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--window-size=1400,900"],
      });

      //TODO TAMBAH REDIS HANDLER

      const tokopedia_data = await retryFunction(
        async () => await tokopedia(browser, search_value),
        3
      );

      const shopee_data = await retryFunction(
        async () => await shopee(browser, search_value),
        3
      );

      console.log(tokopedia_data, shopee_data);

      let all_data: listOfProduct = [];

      if (tokopedia_data && tokopedia_data.length > 0) {
        all_data = all_data.concat(tokopedia_data);
      }
      if (shopee_data && shopee_data.length > 0) {
        all_data = all_data.concat(shopee_data);
      }

      if (browser.pages.length == 0) {
        browser.close();
      }

      return all_data;
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
