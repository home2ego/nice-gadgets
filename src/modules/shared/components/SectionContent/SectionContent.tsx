import clsx from "clsx";
import type { TFunction } from "i18next";
import styles from "./SectionContent.module.scss";

interface SectionProps {
  t: TFunction;
  heading: string;
  countModels: number;
}

const SectionContent: React.FC<SectionProps> = ({
  t,
  heading,
  countModels,
}) => {
  return (
    <section>
      <h1 className={clsx(styles.heading, "title--xl")}>{t(heading)}</h1>

      <p className={clsx(styles.models, "text--body")}>
        {t("countModels", { count: countModels })}
      </p>
    </section>
  );
};

export default SectionContent;
