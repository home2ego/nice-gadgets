import clsx from "clsx";
import type { TFunction } from "i18next";
import { useId, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product } from "../../types/product";
import type { PageOption, SortOption } from "../../types/select";
import ProductCard from "../ProductCard";
import SkipLink from "../SkipLink";
import { INITIAL_PAGE, INITIAL_PER_PAGE, INITIAL_SORT } from "./constants";
import { getSortedProducts } from "./getSortedProducts";
import Pagination from "./Pagination";
import styles from "./ProductsSection.module.scss";
import Select from "./Select";

const sortOptions: SortOption[] = ["newest", "alpha", "cheapest"];
const pageOptions: PageOption[] = ["all", "4", "8", "16"];

interface ProductsProps {
  t: TFunction;
  sectionHeading: string;
  noProducts: string;
  countModels: number;
  products: Product[];
  footerRef: React.RefObject<HTMLElement | null>;
  normalizedLang: string;
}

const ProductsSection: React.FC<ProductsProps> = ({
  t,
  sectionHeading,
  noProducts,
  countModels,
  products,
  footerRef,
  normalizedLang,
}) => {
  const [searchParams] = useSearchParams();
  const productsRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLElement>(null);

  const currentSort = searchParams.get("sort") || INITIAL_SORT;
  const currentPage = +(searchParams.get("page") || INITIAL_PAGE);
  const currentPerPage = searchParams.get("perPage") || INITIAL_PER_PAGE;
  const perPage = currentPerPage === "all" ? countModels : +currentPerPage;
  const hasPagination = currentPerPage !== "all";
  const totalPages = Math.ceil(countModels / perPage);

  const sortedProducts = useMemo(
    () => getSortedProducts(products, currentSort as SortOption),
    [products, currentSort],
  );

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleProducts: Product[] = sortedProducts.slice(startIndex, endIndex);

  const regionId = useId();

  return (
    <section aria-labelledby={regionId}>
      <h1 id={regionId} className={clsx(styles.heading, "title--xl")}>
        {t(sectionHeading)}
      </h1>

      <p className={clsx(styles.models, "text--body")}>
        {t("countModels", { count: countModels })}
      </p>

      <div className={styles.dropdowns}>
        <Select
          t={t}
          label="sortLabel"
          options={sortOptions}
          paramKey="sort"
          initialParamVal={INITIAL_SORT}
        />

        <Select
          t={t}
          label="pageLabel"
          options={pageOptions}
          paramKey="perPage"
          initialParamVal={INITIAL_PER_PAGE}
        />
      </div>

      {visibleProducts.length === 0 && (
        <h2 className="title--lg">{t(noProducts)}</h2>
      )}

      {visibleProducts.length > 0 && (
        <div style={{ position: "relative" }} ref={productsRef}>
          <SkipLink
            content="skipForwardProducts"
            classAttr="skip-forward-products"
            elementRef={hasPagination ? paginationRef : footerRef}
          />

          <ul className={styles.products}>
            {visibleProducts.map((product, idx) => (
              <li key={product.id}>
                <ProductCard
                  t={t}
                  product={product}
                  totalProducts={products.length}
                  productIdx={idx}
                  isLazy={true}
                  hasOnlyFullPrice={false}
                  normalizedLang={normalizedLang}
                />
              </li>
            ))}
          </ul>

          <SkipLink
            content="skipBackProducts"
            classAttr="skip-back-products"
            topElementRef={productsRef}
          />
        </div>
      )}

      {hasPagination && visibleProducts.length > 0 && (
        <Pagination
          paginationRef={paginationRef}
          t={t}
          sectionHeading={sectionHeading}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </section>
  );
};

export default ProductsSection;
