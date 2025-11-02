import clsx from "clsx";
import type { TFunction } from "i18next";
import { useId } from "react";
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
  sectionHeading: string;
  countModels: number;
  items: Device[];
}

const SectionContent: React.FC<SectionProps> = ({
  t,
  sectionHeading,
  countModels,
  items,
}) => {
  const [searchParams] = useSearchParams();

  const currentPage = +(searchParams.get("page") || INITIAL_PAGE);
  const perPage = +(searchParams.get("perPage") || countModels);
  const totalPages = Math.ceil(countModels / perPage);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentPageItems = items.slice(startIndex, endIndex);

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

      <ul>
        {currentPageItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      {totalPages > 1 && (
        <Pagination
          t={t}
          sectionHeading={sectionHeading}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </section>
  );
};

export default SectionContent;
