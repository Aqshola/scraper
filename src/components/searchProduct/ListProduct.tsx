import { listOfProduct, product } from "@/types/product";
import React from "react";
import ProductCard from "@/components/searchProduct/ProductCard";

type Props = {
  listData: listOfProduct;
};

export default function ListProduct(props: Props) {
  return (
    <div className="mt-10 grid grid-cols-12 justify-center gap-4">
      {props.listData.map((data: product) => (
        <div className="col-span-2 h-max" key={data.id}>
          <ProductCard
            price={data.price}
            img={data.photo_link}
            name={data.name}
            rating={data.rating}
            location={data.shop_location}
            platform={data.platform}
            selledItem={data.selled_item}
            link={data.url}
          />
        </div>
      ))}
    </div>
  );
}
