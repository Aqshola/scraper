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
        headless: true,
        defaultViewport: null,
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--window-size=1400,900"],
      });

      const page = await browser.newPage();
      page.setViewport({
        width: 1400,
        height: 900,
        deviceScaleFactor: 1,
      });

      //TODO TAMBAH REDIS HANDLER

      const shopee_data = await shopee(page, search_value);
      // const tokopedia_data = await tokopedia(page, search_value);

      console.log("RETURNED DATA", shopee_data);

      if (browser.pages.length == 0) {
        await browser.close();
        console.log("CLOSED BROWSER");
      }

      return shopee_data;
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
