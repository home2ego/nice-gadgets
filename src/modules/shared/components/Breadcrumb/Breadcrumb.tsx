import clsx from "clsx";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import Icon from "@/layout/shared/components/Icon";
import styles from "./Breadcrumb.module.scss";

interface BreadcrumbProps {
  t: TFunction;
  heading: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ t, heading }) => (
  <nav aria-label={t("breadcrumbLabel")}>
    <ol className={styles.breadcrumb}>
      <li className={styles.breadcrumb__item}>
        <Link
          to="/"
          className={styles.breadcrumb__link}
          aria-label={t("homePageLabel")}
        >
          <Icon>
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </Icon>
        </Link>
      </li>

      <li aria-hidden="true">
        <Icon stroke="var(--text-color-secondary)">
          <path d="m9 18 6-6-6-6" />
        </Icon>
      </li>

      <li aria-current="page" className={styles.breadcrumb__item}>
        <span className={clsx(styles.breadcrumb__current, "text--sm")}>
          {t(heading)}
        </span>
      </li>
    </ol>
  </nav>
);

export default Breadcrumb;
