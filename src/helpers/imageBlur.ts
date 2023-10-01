import { listOfProduct } from "@/types/product";
import { getPlaiceholder } from "plaiceholder";

export const generateBlurData = async (src: string) => {
  const res = await fetch(src);
  const parsedRes = await res.arrayBuffer();
  const buffer = Buffer.from(parsedRes);

  const {
    base64,
    metadata: { height, width },
  } = await getPlaiceholder(buffer);
  return { base64, height, width };
};

export const generateProductBlurData = async (lists: listOfProduct) => {
  const res = await Promise.all(
    lists.map(async (data) => {
      const blurData = await generateBlurData(data.image.src);
      const newObject = Object.assign({}, data);
      newObject.image = {
        ...newObject.image,
        blurHash: blurData.base64,
        height: blurData.height,
        width: blurData.width,
      };

      return Object.assign(data, newObject);
    })
  );

  return res;
};
