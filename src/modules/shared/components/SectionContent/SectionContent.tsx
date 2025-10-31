import clsx from "clsx";
import type { TFunction } from "i18next";
import { useSearchParams } from "react-router-dom";
import type { PageOption, SortOption } from "@/core/types/select";
import Select from "@/ui/Select";
import { INITIAL_PAGE, INITIAL_PER_PAGE, INITIAL_SORT } from "./constants";
import type { Device } from "./device";
import Pagination from "./Pagination";
import styles from "./SectionContent.module.scss";

const sortOptions: SortOption[] = ["newest", "alpha", "cheapest"];
const pageOptions: PageOption[] = ["all", "4", "8", "16"];

interface SectionProps {
  t: TFunction;
  heading: string;
  countModels: number;
  items: Device[];
}

const SectionContent: React.FC<SectionProps> = ({
  t,
  heading,
  countModels,
  items,
}) => {
  const [searchParams] = useSearchParams();

  const currentPage = +(searchParams.get("page") || INITIAL_PAGE);
  const perPage = +(searchParams.get("perPage") || countModels);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentPageItems = items.slice(startIndex, endIndex);

  return (
    <section>
      <h1 className={clsx(styles.heading, "title--xl")}>{t(heading)}</h1>

      <p className={clsx(styles.models, "text--body")}>
        {t("countModels", { count: countModels })}
      </p>

      <div className={styles.dropdowns}>
        <Select
          t={t}
          label="sortLabel"
          options={sortOptions}
          selectedOption={INITIAL_SORT}
          paramKey="sort"
        />

        <Select
          t={t}
          label="pageLabel"
          options={pageOptions}
          selectedOption={INITIAL_PER_PAGE}
          paramKey="perPage"
        />
      </div>

      <ul>
        {currentPageItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      {perPage !== countModels && (
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          totalProducts={countModels}
        />
      )}
    </section>
  );
};

export default SectionContent;
