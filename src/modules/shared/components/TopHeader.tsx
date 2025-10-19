import clsx from "clsx";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import styles from "./TopHeader.module.scss";

interface TopHeaderProps {
  t: TFunction;
  heading: string;
  countModels: number;
}

const TopHeader: React.FC<TopHeaderProps> = ({ t, heading, countModels }) => (
  <>
    <div className={styles.wrapper}>
      <Link
        to="/"
        className={styles.wrapper__link}
        aria-label={t("homepageAriaLabel")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      </Link>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        stroke="var(--text-color-secondary)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>

      <p className={clsx(styles.wrapper__text, "text--sm")}>{t(heading)}</p>
    </div>

    <h1 className={clsx(styles.heading, "title--xl")}>{t(heading)}</h1>

    <p className={styles.models}>{t("countModels", { count: countModels })}</p>
  </>
);

export default TopHeader;
