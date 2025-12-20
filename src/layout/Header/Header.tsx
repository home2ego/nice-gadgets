import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatch } from "react-router-dom";
import Logo from "@/layout/shared/components/Logo";
import type { Category } from "../shared/types/category";
import styles from "./Header.module.scss";
import LangButton from "./LangButton";
import Navbar from "./Navbar";
import Search from "./Search";
import ThemeButton from "./ThemeButton";

const matchToCategory: Record<string, Category> = {
  "/phones": "phones",
  "/tablets": "tablets",
  "/accessories": "accessories",
};

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
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 591px)").matches,
  );
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 1136px)").matches,
  );

  const actionsRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation("header");

  const phonesMatch = useMatch("/phones");
  const tabletsMatch = useMatch("/tablets");
  const accessoriesMatch = useMatch("/accessories");
  const match = phonesMatch || tabletsMatch || accessoriesMatch;

  const categoryKey: Category | undefined = match
    ? matchToCategory[match.pathname]
    : undefined;

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 591px)");
    const mqDesktop = window.matchMedia("(min-width: 1136px)");

    const handleChangeMobile = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    const handleChangeDesktop = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mqMobile.addEventListener("change", handleChangeMobile);
    mqDesktop.addEventListener("change", handleChangeDesktop);

    return () => {
      mqMobile.removeEventListener("change", handleChangeMobile);
      mqDesktop.removeEventListener("change", handleChangeDesktop);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Logo isMobile={isMobile} />
      </div>

      {!isDesktop && categoryKey && <Search t={t} categoryKey={categoryKey} />}

      <div ref={actionsRef} className={styles.header__actions}>
        <Navbar
          categoryKey={categoryKey}
          isDesktop={isDesktop}
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
