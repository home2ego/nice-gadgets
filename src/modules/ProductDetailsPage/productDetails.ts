export interface ProductDetails {
  productId: string;
  id: string;
  category: "phones" | "tablets" | "accessories";
  namespaceId: string;
  name: string;
  shortName: string;
  variant: string;
  variantAvailable: string[];
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[][];
  color: string;
  images: string[];
  description: {
    [languageCode: string]: {
      title: string;
      text: string[];
    }[];
  };
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  zoom?: string;
  camera?: string;
}
