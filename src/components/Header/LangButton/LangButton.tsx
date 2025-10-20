import clsx from "clsx";
import type { i18n, TFunction } from "i18next";
import { useEffect, useId, useRef, useState } from "react";
import iconEN from "../../../assets/icons/en.svg";
import iconFI from "../../../assets/icons/fi.svg";
import iconPL from "../../../assets/icons/pl.svg";
import iconUK from "../../../assets/icons/uk.svg";
import styles from "./LangButton.module.scss";

const languages = [
  { code: "en", label: "English", icon: iconEN },
  { code: "fi", label: "Suomi", icon: iconFI },
  { code: "pl", label: "Polski", icon: iconPL },
  { code: "uk", label: "Українська", icon: iconUK },
];

interface LangProps {
  normalizedLang: string;
  t: TFunction;
  i18n: i18n;
}

const LangButton: React.FC<LangProps> = ({ normalizedLang, t, i18n }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const langId = useId();

  useEffect(() => {
    const handleOutsideClick = (e: PointerEvent) => {
      if (!divRef.current) {
        return;
      }

      if (!divRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("pointerdown", handleOutsideClick);
    }

    return () =>
      document.removeEventListener("pointerdown", handleOutsideClick);
  }, [isExpanded]);

  const sortedLanguages = [...languages].sort((a, b) =>
    normalizedLang === a.code ? -1 : normalizedLang === b.code ? 1 : 0,
  );

  return (
    // biome-ignore lint: a11y/noStaticElementInteractions — wrapper for interactive state
    <div
      className={styles.lang}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onBlur={(e) =>
        !e.currentTarget.contains(e.relatedTarget) && setIsExpanded(false)
      }
      onKeyUp={(e) => {
        if (e.key === "Escape") {
          setIsExpanded(false);
          btnRef.current?.focus();
        }
      }}
      ref={divRef}
    >
      <button
        type="button"
        aria-label={t("langLabel")}
        aria-expanded={isExpanded}
        aria-haspopup="menu"
        aria-controls={langId}
        className={styles.lang__toggle}
        onPointerDown={(e) =>
          e.pointerType !== "mouse" && setIsExpanded((prev) => !prev)
        }
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsExpanded((prev) => !prev);
          }
        }}
        ref={btnRef}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          stroke="var(--text-color-primary)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          stroke="var(--text-color-primary)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div id={langId} className={styles.lang__menu}>
        {sortedLanguages.map((lang) => (
          <button
            type="button"
            key={lang.code}
            className={clsx(styles.lang__action, "text--sm")}
            disabled={normalizedLang === lang.code}
            aria-disabled={normalizedLang === lang.code}
            onClick={() => {
              i18n.changeLanguage(lang.code);
              setIsExpanded(false);
            }}
          >
            <img
              src={lang.icon}
              alt=""
              width="15"
              height="15"
              decoding="async"
            />
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LangButton;
