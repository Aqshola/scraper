import { shopee, tokopedia } from "@/helpers/servers/scraper";
import { procedure, router } from "@/server";
import { z } from "zod";
import puppeteer from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import { retryFunction } from "@/helpers/servers/helper";
import { listOfProduct } from "@/types/product";
import { initRedis } from "@/helpers/servers/redis";

export const appRouter = router({
  searchProduct: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (opts) => {
      puppeteer.use(stealthPlugin());

      if (!opts.input.text.trim()) throw new Error("Product cannot be empty");
      const search_value = opts.input.text;
      const browser = await puppeteer.launch({
        headless: true,
        timeout: 15000,
        defaultViewport: null,
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--window-size=1400,900"],
      });

      const redis_client = await initRedis();
      const cache_data = await redis_client.get(search_value);

      if (cache_data) {
        const parse_data_cache = JSON.parse(cache_data) as listOfProduct;
        return parse_data_cache.sort((a, b) => a.price - b.price);
      }

      //TODO TAMBAH REDIS HANDLER

      const tokopedia_data = await retryFunction(
        async () => await tokopedia(browser, search_value),
        3
      );

      const shopee_data = await retryFunction(
        async () => await shopee(browser, search_value),
        3
      );

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

      console.log("CACHING");
      await redis_client.set(search_value, JSON.stringify(all_data));
      console.log("DONE CACHING");
      return all_data.sort((a, b) => a.price - b.price);
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
