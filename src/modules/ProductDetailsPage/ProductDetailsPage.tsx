import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import accessories from "@/api/accessories.json";
import phones from "@/api/phones.json";
import tablets from "@/api/tablets.json";
import Back from "../shared/components/Back";
import Breadcrumb from "../shared/components/Breadcrumb";
import NotFoundProduct from "./NotFoundProduct";
import styles from "./ProductDetailsPage.module.scss";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { t } = useTranslation("productDetailsPage");

  const allProducts = [...phones, ...tablets, ...accessories];
  const product = allProducts.find((product) => product.id === productId);

  if (!product) {
    return <NotFoundProduct t={t} />;
  }

  return (
    <>
      <title>{`${product.name} | Nice Gadgets`}</title>

      <Breadcrumb t={t} heading={product.category} productName={product.name} />

      <Back t={t} />

      <h1 className={clsx(styles.heading, "title--lg")}>{product?.name}</h1>

      <article className={styles.product}></article>
    </>
  );
};

export default ProductDetailsPage;
