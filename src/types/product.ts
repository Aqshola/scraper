export type product = {
  id: string;
  name: string;
  price: number;
  photo_link: string;
  url: string;
  shop_location: string;
  rating: string;
  selled_item: string;
  platform: "shopee" | "tokopedia";
};
export type listOfProduct = Array<product>;
