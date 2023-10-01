import { Image } from "@/types/image";

export type product = {
  id: string;
  name: string;
  price: number;
  url: string;
  shop_location: string;
  rating: string;
  selled_item: string;
  platform: "shopee" | "tokopedia";
  image: Image;
};
export type listOfProduct = Array<product>;
