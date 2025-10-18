import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../shared/components/Logo";
import styles from "./Header.module.scss";
import LangButton from "./LangButton";
import Navbar from "./Navbar";
import ThemeButton from "./ThemeButton";

interface HeaderProps {
  normalizedLang: string;
}

const Header: React.FC<HeaderProps> = ({ normalizedLang }) => {
  const actionsRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation("header");

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Logo />
      </div>

      <div ref={actionsRef} className={styles.header__actions}>
        <Navbar actionsRef={actionsRef} t={t} />

        <LangButton normalizedLang={normalizedLang} t={t} i18n={i18n} />

        <ThemeButton t={t} />
      </div>
    </header>
  );
};

export default Header;
