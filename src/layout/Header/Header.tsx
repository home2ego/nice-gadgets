import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Logo from "@/layout/shared/components/Logo";
import styles from "./Header.module.scss";
import LangButton from "./LangButton";
import Navbar from "./Navbar";
import ThemeButton from "./ThemeButton";

interface HeaderProps {
  normalizedLang: string;
  mainRef: React.RefObject<HTMLElement | null>;
  footerRef: React.RefObject<HTMLElement | null>;
  skipRef: React.RefObject<HTMLAnchorElement | null>;
}

const Header: React.FC<HeaderProps> = ({
  normalizedLang,
  mainRef,
  footerRef,
  skipRef,
}) => {
  const actionsRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation("header");

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Logo />
      </div>

      <div ref={actionsRef} className={styles.header__actions}>
        <Navbar
          actionsRef={actionsRef}
          t={t}
          mainRef={mainRef}
          footerRef={footerRef}
          skipRef={skipRef}
        />

        <LangButton normalizedLang={normalizedLang} t={t} i18n={i18n} />

        <ThemeButton t={t} />
      </div>
    </header>
  );
};

export default Header;
