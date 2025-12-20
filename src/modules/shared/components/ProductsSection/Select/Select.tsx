import clsx from "clsx";
import type { TFunction } from "i18next";
import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "@/layout/shared/components/Icon";
import type { PageOption, SortOption } from "@/modules/shared/types/select";
import styles from "./Select.module.scss";

interface SelectProps {
  t: TFunction;
  label: string;
  options: SortOption[] | PageOption[];
  paramKey: "sort" | "perPage";
  initialParamVal: SortOption | PageOption;
}

const Select: React.FC<SelectProps> = ({
  t,
  label,
  options,
  paramKey,
  initialParamVal,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState(() => {
    const val = searchParams.get(paramKey) as SortOption | PageOption | null;

    return val || initialParamVal;
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelId = useId();
  const valueId = useId();

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

  const handleSearchParamsChange = (paramVal: SortOption | PageOption) => {
    const params = new URLSearchParams(searchParams);

    if (paramVal === "all") {
      params.delete("perPage");
      params.delete("page");
    } else {
      params.set(paramKey, paramVal);

      if (paramKey === "perPage" || params.has("page")) {
        params.set("page", "1");
      }
    }

    setSearchParams(params);
  };

  const handleToggleKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setIsExpanded(true);
    }
  };

  const handleOptionClick = (option: SortOption | PageOption) => {
    if (selected !== option) {
      setSelected(option);
      handleSearchParamsChange(option);
    }

    setIsExpanded(false);
  };

  const handleOptionKey = (
    e: React.KeyboardEvent<HTMLDivElement>,
    option: SortOption | PageOption,
    idx: number,
  ) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();

        if (selected !== option) {
          setSelected(option);
          handleSearchParamsChange(option);
        }

        setIsExpanded(false);
        toggleRef.current?.focus();
        break;

      case "ArrowDown": {
        e.preventDefault();

        const nextIndex = idx === options.length - 1 ? 0 : idx + 1;
        const next = optionRefs.current[nextIndex];
        next?.focus();
        break;
      }

      case "ArrowUp": {
        e.preventDefault();
        const prevIndex = idx === 0 ? options.length - 1 : idx - 1;
        const prev = optionRefs.current[prevIndex];
        prev?.focus();
        break;
      }

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

        <Icon>
          <path d="m6 9 6 6 6-6" />
        </Icon>
      </button>

      <div role="listbox" className={styles.dropdown__menu} ref={menuRef}>
        {options.map((option, idx) => (
          <div
            key={option}
            role="option"
            className={clsx(styles.dropdown__option, "text--body")}
            tabIndex={selected === option ? 0 : -1}
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
