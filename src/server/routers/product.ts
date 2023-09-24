import { procedure, router } from "@/server";
import { z } from "zod";
import puppeteer from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import { retryFunction } from "@/helpers/util";
import { listOfProduct } from "@/types/product";
import { shopee, tokopedia } from "@/libs/scraper";
import { getRedisClient } from "@/libs/redis";
import { handleLoading } from "@/libs/loader";

const redis = getRedisClient();
const product = router({
  search: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (opts) => {
      const request_browser_id = opts.ctx.browserId as string;
      handleLoading(request_browser_id, 0); // START LOADING
      puppeteer.use(stealthPlugin());

      if (!opts.input.text.trim()) throw new Error("Product cannot be empty");
      const search_value = opts.input.text;

      const browser = await puppeteer.launch({
        timeout: 15000,
        defaultViewport: null,
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--window-size=1400,900"],
      });

      const cache_data = await redis.get(search_value);

      if (cache_data) {
        const parse_data_cache = JSON.parse(cache_data) as listOfProduct;
        handleLoading(request_browser_id, 4); // FINISH
        return parse_data_cache.sort((a, b) => a.price - b.price);
      }

      const tokopedia_data = await retryFunction(
        async () => await tokopedia(browser, search_value),
        3
      );
      handleLoading(request_browser_id, 1); // START TOKOPEDIA

      const shopee_data = await retryFunction(
        async () => await shopee(browser, search_value),
        3
      );
      handleLoading(request_browser_id, 2); // START SHOPEE

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
      handleLoading(request_browser_id, 3);

      console.log("CACHING");
      await redis.set(search_value, JSON.stringify(all_data));
      console.log("DONE CACHING");
      handleLoading(request_browser_id, 4); // FINISH
      return all_data.sort((a, b) => a.price - b.price);
    }),
});

export default product;
