import clsx from "clsx";
import type { TFunction } from "i18next";
// import phones from "@/api/phones.json";
import type { PageOption, SortOption } from "@/core/types/select";
import Select from "@/ui/Select";
import styles from "./SectionContent.module.scss";

const sortOptions: SortOption[] = ["newest", "alpha", "cheapest"];
const pageOptions: PageOption[] = ["all", "4", "8", "16"];

interface SectionProps {
  t: TFunction;
  heading: string;
  countModels: number;
}

const SectionContent: React.FC<SectionProps> = ({
  t,
  heading,
  countModels,
}) => (
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
        selectedOption={sortOptions[0]}
        paramKey="sort"
      />

      <Select
        t={t}
        label="pageLabel"
        options={pageOptions}
        selectedOption={pageOptions[0]}
        paramKey="perPage"
      />
    </div>
  </section>
);

export default SectionContent;
