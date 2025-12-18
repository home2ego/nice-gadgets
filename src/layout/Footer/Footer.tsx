import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Logo from "@/layout/shared/components/Logo";
import { focusElement } from "@/layout/shared/utils/focusElement";
import Icon from "../shared/components/Icon";
import styles from "./Footer.module.scss";

interface FooterProps {
  mainRef: React.RefObject<HTMLElement | null>;
  footerRef: React.RefObject<HTMLElement | null>;
}

const Footer: React.FC<FooterProps> = ({ mainRef, footerRef }) => {
  const { t } = useTranslation("footer");

  const handleBackToTop = () => {
    if (!mainRef.current) {
      return;
    }

    focusElement(mainRef.current);
    window.scrollTo({ top: 0 });
  };

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={clsx(styles.footer__wrapper, "container")}>
        <Logo isMobile={false} />

        <ul className={styles.footer__list} aria-label={t("linksLabel")}>
          <li>
            <a
              href="https://github.com/home2ego/nice-gadgets"
              target="_blank"
              rel="noopener noreferrer"
              className="btn--footer text--uppercase"
            >
              {t("github")}
            </a>
          </li>
          <li>
            <NavLink to="/contacts" className="btn--footer text--uppercase">
              {t("contacts")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/rights" className="btn--footer text--uppercase">
              {t("rights")}
            </NavLink>
          </li>
        </ul>

        <button
          type="button"
          className={styles.footer__back}
          onClick={handleBackToTop}
        >
          <span className={"text--sm"}>{t("backToTop")}</span>

          <span className={styles.footer__icon}>
            <Icon>
              <path d="m18 15-6-6-6 6" />
            </Icon>
          </span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
