import clsx from "clsx";
import { useParams } from "react-router-dom";
import accessories from "@/api/accessories.json";
import phones from "@/api/phones.json";
import tablets from "@/api/tablets.json";
import styles from "./ProductDetailsPage.module.scss";

const ProductDetailsPage = () => {
  const { productId } = useParams();

  const allProducts = [...phones, ...tablets, ...accessories];
  const product = allProducts.find((product) => product.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <h1 className={clsx(styles.heading, "title--lg")}>{product?.name}</h1>;
};

export default ProductDetailsPage;
