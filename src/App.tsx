import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SkipLink from "./components/shared/components/SkipLink";
import "./App.scss";

const App = () => {
  const { i18n } = useTranslation();
  const mainRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const normalizedLang = i18n.language?.split("-")[0];

  useEffect(() => {
    if (document.documentElement.lang !== normalizedLang) {
      document.documentElement.lang = normalizedLang;
    }
  }, [normalizedLang]);

  return (
    <div className="App">
      <SkipLink
        mainRef={mainRef}
        content="skipToContent"
        classAttr="skip-content"
      />

      <Header normalizedLang={normalizedLang} />

      <main ref={mainRef} className="container">
        <Outlet context={{ mainRef, footerRef }} />
      </main>

      <Footer mainRef={mainRef} footerRef={footerRef} />
    </div>
  );
};

export default App;
