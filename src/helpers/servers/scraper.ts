import { listOfProduct } from "@/types/product";
import { HTTPResponse, Page } from "puppeteer";

export async function shopee(page: Page, searchProduct: string) {
  const shopee_link = "https://shopee.co.id";
  await page.goto(shopee_link, {
    waitUntil: "networkidle2",
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
              name: item_info.name,
              photo_link: item_info.image,
              price: item_info.price,
              rating: item_info.item_rating.rating_star,
              selled_item: item_info.historical_sold,
              shop_location: item_info.shop_location,
              url: "",
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

export async function tokopedia(page: Page, searchProduct: string) {
  const tokopedia_link = "https://www.tokopedia.com";

  await page.goto(tokopedia_link, {
    waitUntil: "networkidle0",
  });

  await page.waitForSelector('[aria-label="Cari di Tokopedia"]');
  await page.type('[aria-label="Cari di Tokopedia"]', searchProduct);
  await page.keyboard.press("Enter");

  let result: listOfProduct = [];

  page.on("response", async (response: HTTPResponse) => {
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
              name: el.shop.name + " - " + el.name,
              photo_link: el.imageUrl,
              price: el.price,
              rating: el.ratingAverage,
              selled_item: el.labelgroup[2].title,
              shop_location: el.shop.city,
              url: el.url,
            });
          });
        }

        return result;
      }
    }
  });

  return result;
}
