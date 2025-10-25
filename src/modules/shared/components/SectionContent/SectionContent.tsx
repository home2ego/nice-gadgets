import clsx from "clsx";
import type { TFunction } from "i18next";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./SectionContent.module.scss";

const options = ["Newest", "Alphabetically", "Cheapest"];

interface SectionProps {
  t: TFunction;
  heading: string;
  countModels: number;
}

const SectionContent: React.FC<SectionProps> = ({
  t,
  heading,
  countModels,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelId = useId();

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
    if (!isExpanded) {
      return;
    }

    const target = optionRefs.current.find(
      (option) => option?.getAttribute("aria-selected") === "true",
    );

    target?.focus();
  }, [isExpanded]);

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

  const handleOptionSelectKey = (
    e: React.KeyboardEvent<HTMLDivElement>,
    option: string,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelected(option);
      setIsExpanded(false);
      toggleRef.current?.focus();
    }
  };

  return (
    <section>
      <h1 className={clsx(styles.heading, "title--xl")}>{t(heading)}</h1>

      <p className={clsx(styles.models, "text--body")}>
        {t("countModels", { count: countModels })}
      </p>

      <div className={styles.dropdowns}>
        {/* biome-ignore lint/a11y/useSemanticElements: not a form group */}
        <div
          role="group"
          className={styles.dropdown}
          aria-labelledby={labelId}
          onKeyDown={handleEscapeKey}
          ref={dropdownRef}
        >
          <span
            id={labelId}
            className={clsx(styles.dropdown__label, "text--sm")}
          >
            Sort by
          </span>

          <button
            type="button"
            className={styles.dropdown__toggle}
            aria-expanded={isExpanded ? "true" : "false"}
            aria-haspopup="listbox"
            onClick={() => setIsExpanded((prev) => !prev)}
            ref={toggleRef}
          >
            <span className="text--btn">{selected}</span>

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

          <div role="listbox" className={styles.dropdown__menu} ref={menuRef}>
            {options.map((option, idx) => (
              <div
                key={option}
                role="option"
                className={clsx(styles.dropdown__option, "text--body")}
                tabIndex={0}
                aria-selected={selected === option ? "true" : "false"}
                onClick={() => {
                  setSelected(option);
                  setIsExpanded(false);
                }}
                onKeyDown={(e) => handleOptionSelectKey(e, option)}
                ref={(el) => {
                  optionRefs.current[idx] = el;
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionContent;
