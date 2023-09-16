import { listOfProduct } from "@/types/product";
import { Browser, HTTPResponse } from "puppeteer";
import { elapsed_time } from "@/helpers/servers/helper";
import {
  convertPriceByDivide,
  parseStringPriceWithLabelToNumber,
  shopeeImageConverter,
  shopeeLinkConverter,
} from "../common/parsing";

export async function shopee(
  browser: Browser,
  searchProduct: string
): Promise<listOfProduct> {
  elapsed_time("START SHOPEE");
  const shopee_link = "https://shopee.co.id";
  const page = await browser.newPage();
  await page.goto(shopee_link, {
    waitUntil: "networkidle2",
    timeout: 10000,
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

          list_item.forEach((el) => {
            const item_info = el.item_basic;
            result.push({
              id: item_info.itemid,
              name: item_info.name,
              photo_link: shopeeImageConverter(item_info.images[0]),
              price: convertPriceByDivide(item_info.price, 100000),
              rating: item_info.item_rating.rating_star,
              selled_item: item_info.historical_sold,
              shop_location: item_info.shop_location,
              url: shopeeLinkConverter(
                item_info.name,
                item_info.shopid,
                item_info.itemid
              ),
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
  elapsed_time("END SHOPEE");
  return result_scrap;
}

export async function tokopedia(
  browser: Browser,
  searchProduct: string
): Promise<listOfProduct> {
  elapsed_time("START TOKOPEDIA");
  const tokopedia_link = "https://www.tokopedia.com";
  const page = await browser.newPage();
  await page.goto(tokopedia_link, {
    waitUntil: "networkidle2",
    timeout: 10000,
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
            const parsing_data = jsonval.map(
              (el: any) => el.data.ace_search_product_v4.data.products
            );

            if (parsing_data.length > 0) {
              const data_product: Array<any> = parsing_data[0];
              data_product.forEach((el) => {
                result.push({
                  id: el.id,
                  name: el.shop.name + " - " + el.name,
                  photo_link: el.imageUrl,
                  price: parseStringPriceWithLabelToNumber(el.price),
                  rating: el.ratingAverage,
                  selled_item: el.labelGroups[el.labelGroups.length - 1].title,
                  shop_location: el.shop.city,
                  url: el.url,
                  platform: "tokopedia",
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
  elapsed_time("END TOKOPEDIA");
  return result_scrap;
}
