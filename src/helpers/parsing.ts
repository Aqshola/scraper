export const parseStringPriceWithLabelToNumber = (numstr: string) => {
  const new_num = numstr.toLowerCase().replaceAll("rp", ""); //replace curr
  const new_num2 = new_num.replaceAll(".", "");
  const new_num3 = new_num2.replaceAll(",", ".");

  return Number(new_num3);
};

export const convertPriceByDivide = (price: number, divider: number) => {
  return price / divider;
};

export const shopeeLinkConverter = (
  name: string,
  shopId: string,
  itemId: string
) => {
  const parsed_name = name.replaceAll(" ", "-");
  const parsed_special = parsed_name.replaceAll("/", "-");

  return `https://shopee.co.id/${parsed_special}-i.${shopId}.${itemId}`;
};

export const shopeeImageConverter = (image: string) => {
  return `https://down-id.img.susercontent.com/file/${image}`;
};
export const shopeeHandleSelledItem = (count: number) => {
  if (count <= 60) return count;

  const base10_number = Math.floor(Math.log10(count));
  const multiplier = Math.pow(10, base10_number);

  const rounded = Math.floor(count / multiplier) * multiplier;
  const label_rounded = numberSpeller(rounded);

  return `${label_rounded}+ Terjual`;
};

export const tokopediaGetSelledItem = (arrList: Array<any>) => {
  for (let i = 0; i < arrList.length; i++) {
    const current_value = arrList[i].title as string;
    const isContainTerjual = current_value.toLowerCase().includes("terjual");

    if (isContainTerjual) {
      return current_value;
    }
  }
  return "Belum Terjual";
};

export const tokopediaCheckIsSelledItem = (str: String) => {
  if (str.toLowerCase().includes("terjual")) return str;
  return "Belum Terjual";
};

export const amountFormatter = (amount: number) => {
  const formatted = new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return formatted;
};

export const numberSpeller = (count: number) => {
  if (count >= 1000) {
    return `${count / 1000}rb`;
  }

  return `${count}`;
};
