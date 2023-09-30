import { procedure, router } from "@/server";
import puppeteer from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import { measureAndRetry, retryFunction } from "@/helpers/util";
import { listOfProduct } from "@/types/product";
import { shopee, tokopedia } from "@/libs/scraper";
import { redisClient } from "@/libs/redis";
import { handleLoading } from "@/libs/loader";
import { TRPCError } from "@trpc/server";
import { productInputSchema } from "@/libs/schema";
import { logger } from "@/libs/logger";
import shell from "shelljs";

const product = router({
  search: procedure.input(productInputSchema).query(async (opts) => {
    const request_browser_id = opts.ctx.browserId as string;
    let all_data: listOfProduct = [];
    let tokopedia_data: listOfProduct = [];
    let shopee_data: listOfProduct = [];
    handleLoading(request_browser_id, 0); // START LOADING
    puppeteer.use(stealthPlugin());

    if (!opts.input.text.trim())
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Product cannot be empty",
      });
    const search_value = opts.input.text;

    const cache_data = await redisClient.get(search_value);

    if (cache_data) {
      const parse_data_cache = JSON.parse(cache_data) as listOfProduct;
      handleLoading(request_browser_id, 4); // FINISH
      return parse_data_cache.sort((a, b) => a.price - b.price);
    }

    logger.info("BROWSER OPEN");
    const browser = await puppeteer.launch({
      headless: "new",
      timeout: 15000,
      defaultViewport: null,
      ignoreHTTPSErrors: true,
      args: ["--no-sandbox", "--window-size=1400,900"],
    });

    try {
      tokopedia_data = await measureAndRetry(
        async () => await tokopedia(browser, search_value),
        "TOKOPEDIA"
      );
      handleLoading(request_browser_id, 1); // START TOKOPEDIA

      shopee_data = await measureAndRetry(
        async () => await shopee(browser, search_value),
        "SHOPEE"
      );
      handleLoading(request_browser_id, 2); // START SHOPEE
    } catch (error) {
      logger.error("Error happens", error);
    } finally {
      logger.info("BROWSER CLOSED");
      await browser.close();
    }

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
    await redisClient.set(search_value, JSON.stringify(all_data));
    handleLoading(request_browser_id, 4); // FINISH
    return all_data.sort((a, b) => a.price - b.price);
  }),
});

export default product;
