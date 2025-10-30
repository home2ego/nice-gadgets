import clsx from "clsx";
import type { TFunction } from "i18next";
import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { PageOption, SortOption } from "@/core/types/select";
import styles from "./Select.module.scss";

interface LabelProps {
  t: TFunction;
  label: string;
  options: SortOption[] | PageOption[];
  selectedOption: SortOption | PageOption;
  paramKey: "sort" | "perPage";
}

const Select: React.FC<LabelProps> = ({
  t,
  label,
  options,
  selectedOption,
  paramKey,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState(selectedOption);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelId = useId();
  const valueId = useId();

  const [searchParams, setSearchParams] = useSearchParams();

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

  const handleToggleKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      setIsExpanded(true);
    }
  };

  const handleOptionClick = (option: SortOption | PageOption) => {
    if (selected !== option) {
      setSelected(option);

      const params = new URLSearchParams(searchParams);
      params.set(paramKey, option);
      setSearchParams(params);
    }

    setIsExpanded(false);
  };

  const handleOptionKey = (
    e: React.KeyboardEvent<HTMLDivElement>,
    option: SortOption | PageOption,
    idx: number,
  ) => {
    const prev = optionRefs.current[idx - 1];
    const next = optionRefs.current[idx + 1];

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();

        if (selected !== option) {
          setSelected(option);

          const params = new URLSearchParams(searchParams);
          params.set(paramKey, option);
          setSearchParams(params);
        }

        setIsExpanded(false);
        toggleRef.current?.focus();
        break;

      case "ArrowDown":
        next?.focus();
        break;

      case "ArrowUp":
        prev?.focus();
        break;

      case "Escape":
        e.stopPropagation();
        setIsExpanded(false);
        toggleRef.current?.focus();
        break;

      case "Tab":
        setIsExpanded(false);
        break;
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <span id={labelId} className={clsx(styles.dropdown__label, "text--sm")}>
        {t(label)}
      </span>

      <button
        type="button"
        className={styles.dropdown__toggle}
        aria-labelledby={`${labelId} ${valueId}`}
        aria-expanded={isExpanded}
        aria-haspopup="listbox"
        onClick={() => setIsExpanded((prev) => !prev)}
        onKeyDown={handleToggleKey}
        ref={toggleRef}
      >
        <span id={valueId} className="text--btn">
          {t(selected)}
        </span>

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
            aria-selected={selected === option}
            onClick={() => handleOptionClick(option)}
            onKeyDown={(e) => handleOptionKey(e, option, idx)}
            ref={(el) => {
              optionRefs.current[idx] = el;
            }}
          >
            {t(option)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
