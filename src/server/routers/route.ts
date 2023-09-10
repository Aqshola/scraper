import { shopee, tokopedia } from "@/helpers/servers/scraper";
import { procedure, router } from "@/server";
import { z } from "zod";
import puppeteer from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";

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
        defaultViewport: null,
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--window-size=1400,900"],
      });

      //TODO TAMBAH REDIS HANDLER

      const tokopedia_data = await tokopedia(browser, search_value);
      const shopee_data = await shopee(browser, search_value);

      const all_data = shopee_data.concat(tokopedia_data);

      return all_data;
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
