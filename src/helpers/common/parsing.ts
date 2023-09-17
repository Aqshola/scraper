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

export const amountFormatter = (amount: number) => {
  const formatted = new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return formatted;
};
