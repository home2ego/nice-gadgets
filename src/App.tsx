import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { focusElement } from "@/layout/shared/utils/focus-element";
import "./App.scss";

const App = () => {
  const { t, i18n } = useTranslation();
  const mainRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const skipRef = useRef<HTMLAnchorElement>(null);

  const normalizedLang = i18n.language?.split("-")[0];

  useEffect(() => {
    if (document.documentElement.lang !== normalizedLang) {
      document.documentElement.lang = normalizedLang;
    }
  }, [normalizedLang]);

  const handleSkipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (mainRef.current) {
      focusElement(mainRef.current);
    }
  };

  return (
    <div className="App">
      {/* biome-ignore lint/a11y/useValidAnchor: skip link performs custom focus */}
      <a
        href="#"
        className={clsx("skip-content", "sr-skip-link", "text--uppercase")}
        onClick={handleSkipToContent}
        ref={skipRef}
      >
        {t("skipToContent")}
      </a>

      <Header
        normalizedLang={normalizedLang}
        mainRef={mainRef}
        footerRef={footerRef}
        skipRef={skipRef}
      />

      <main ref={mainRef} className="container">
        <Outlet context={{ mainRef, footerRef, normalizedLang }} />
      </main>

      <Footer mainRef={mainRef} footerRef={footerRef} />
    </div>
  );
};

export default App;
