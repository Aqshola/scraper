import { listOfProduct } from "@/types/product";
import { Browser, HTTPResponse } from "puppeteer";

import {
  convertPriceByDivide,
  parseStringPriceWithLabelToNumber,
  shopeeImageConverter,
  shopeeLinkConverter,
  tokopediaGetSelledItem,
} from "@/helpers/parsing";
import { TIMEOUT_DURATION } from "@/constant";

export async function shopee(
  browser: Browser,
  searchProduct: string
): Promise<listOfProduct> {
  const shopee_link = "https://shopee.co.id";
  const page = await browser.newPage();
  await page.goto(shopee_link, {
    waitUntil: "networkidle2",
    timeout: 150000,
  });

  await page.waitForSelector(".shopee-searchbar-input__input");
  await page.type(".shopee-searchbar-input__input", searchProduct);
  await page.keyboard.press("Enter");

  const responseData: () => Promise<listOfProduct> = () => {
    return new Promise((resolve) => {
      page.on("response", async (response: HTTPResponse) => {
        let result: listOfProduct = [];
        const request = response.request();
        if (
          request.url().includes("/api/v4/search/search_items?by=relevancy")
        ) {
          const jsonval = await response.json();
          const list_item: Array<any> = await jsonval.items;
          console.log("SHOPEE ITEM", list_item, jsonval);

          if (!list_item) resolve([]); //handle undefined

          list_item.forEach((el) => {
            const item_info = el.item_basic;
            const imageSrc = shopeeImageConverter(item_info.images[0]);
            result.push({
              id: item_info.itemid,
              name: item_info.name,
              price: convertPriceByDivide(item_info.price, 100000),
              rating: item_info.item_rating.rating_star,
              selled_item: item_info.historical_sold,
              shop_location: item_info.shop_location,
              url: shopeeLinkConverter(
                item_info.name,
                item_info.shopid,
                item_info.itemid
              ),
              image: {
                src: imageSrc,
                height: "",
                blurHash: "",
                width: "",
              },
              platform: "shopee",
            });
          });

          resolve(result);
          await page.close();
        }
      });
    });
  };

  const result_scrap = await responseData();
  return result_scrap;
}

export async function tokopedia(
  browser: Browser,
  searchProduct: string
): Promise<listOfProduct> {
  const tokopedia_link = "https://www.tokopedia.com";
  const page = await browser.newPage();
  await page.goto(tokopedia_link, {
    waitUntil: "networkidle2",
    timeout: TIMEOUT_DURATION,
  });

  await page.waitForSelector('[aria-label="Cari di Tokopedia"]');
  await page.type('[aria-label="Cari di Tokopedia"]', searchProduct);
  await page.keyboard.press("Enter");

  const response_data: () => Promise<listOfProduct> = () =>
    new Promise((resolve) => {
      page.on("response", async (response: HTTPResponse) => {
        const result: listOfProduct = [];
        const request = response.request();
        if (request.url().includes("/graphql/SearchProductQueryV4")) {
          let method = response.request().method();
          if (method == "POST") {
            const jsonval: [] = await response.json();
            if (!jsonval) resolve([]);
            const parsing_data = jsonval.map(
              (el: any) => el.data.ace_search_product_v4.data.products
            );

            if (parsing_data.length > 0) {
              const data_product: Array<any> = parsing_data[0];
              data_product.forEach((el) => {
                result.push({
                  id: el.id,
                  name: el.shop.name + " - " + el.name,
                  price: parseStringPriceWithLabelToNumber(el.price),
                  rating: el.ratingAverage,
                  selled_item: tokopediaGetSelledItem(el.labelGroups),
                  shop_location: el.shop.city,
                  url: el.url,
                  platform: "tokopedia",
                  image: {
                    src: el.imageUrl,
                    height: "",
                    blurHash: "",
                    width: "",
                  },
                });
              });
              resolve(result);
              await page.close();
            }
          }
        }
      });
    });

  const result_scrap = await response_data();
  return result_scrap;
}
