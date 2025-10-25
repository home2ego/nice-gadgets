import clsx from "clsx";
import type { i18n, TFunction } from "i18next";
import { useEffect, useRef, useState } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const langRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const openedByKeyboard = useRef(false);

  const currentLangLabel =
    languages.find((lang) => lang.code === normalizedLang)?.label ?? "";

  useEffect(() => {
    menuRef.current?.toggleAttribute("inert", !isExpanded); // Instant tab removal; visibility:hidden fades late.

    if (!isExpanded) {
      return;
    }

    const handleOutsideClick = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded || !openedByKeyboard.current) {
      return;
    }

    const target = langRefs.current.find(
      (lang) => lang?.getAttribute("aria-current") === "true",
    );

    target?.focus();

    openedByKeyboard.current = false;
  }, [isExpanded]);

  const sortedLanguages = [
    // biome-ignore lint/style/noNonNullAssertion: .find() doesn't return undefined
    languages.find((lang) => lang.code === normalizedLang)!,
    ...languages.filter((lang) => lang.code !== normalizedLang),
  ];

  const handleDropdownBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as HTMLElement | null;

    if (!next) {
      return;
    }

    if (!e.currentTarget.contains(next)) {
      setIsExpanded(false);
    }
  };

  const handleEscapeKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isExpanded) {
      return;
    }

    if (e.key === "Escape") {
      e.stopPropagation();
      setIsExpanded(false);
      toggleRef.current?.focus();
    }
  };

  const handleToggleKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      if (!isExpanded) {
        openedByKeyboard.current = true;
      }

      setIsExpanded((prev) => !prev);
    }
  };

  const handleLangClick = (langCode: string) => {
    if (normalizedLang === langCode) {
      return;
    }

    i18n.changeLanguage(langCode);
    setIsExpanded(false);
    toggleRef.current?.focus();
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: not a form group
    <div
      role="group"
      aria-label={t("langNavLabel")}
      className={styles.dropdown}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setIsExpanded(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setIsExpanded(false);
      }}
      onBlur={handleDropdownBlur}
      onKeyDown={handleEscapeKey}
      ref={dropdownRef}
    >
      <button
        type="button"
        aria-label={t("langLabel", { lang: currentLangLabel })}
        aria-expanded={isExpanded ? "true" : "false"}
        aria-haspopup="true"
        className={styles.dropdown__toggle}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") setIsExpanded((prev) => !prev);
        }}
        onKeyDown={handleToggleKey}
        ref={toggleRef}
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

      <div className={styles.dropdown__menu} ref={menuRef}>
        {sortedLanguages.map((lang, idx) => (
          <button
            key={lang.code}
            className={clsx(styles.dropdown__lang, "text--sm")}
            type="button"
            aria-current={normalizedLang === lang.code ? "true" : undefined}
            onClick={() => handleLangClick(lang.code)}
            ref={(el) => {
              langRefs.current[idx] = el;
            }}
          >
            <img
              src={lang.icon}
              alt=""
              width="15"
              height="15"
              decoding="async"
            />

            <span lang={lang.code}>{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LangButton;
