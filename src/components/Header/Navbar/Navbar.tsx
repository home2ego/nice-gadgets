import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  actionsRef: React.RefObject<HTMLElement | null>;
}

const Navbar = ({ actionsRef }: NavbarProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation("header");
  const [isExpanded, setIsExpanded] = useState(false);
  const menuWrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const navbarId = useId();

  // biome-ignore lint: correctness/useExhaustiveDependencies — pathname triggers scroll on route change
  useLayoutEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  useEffect(() => {
    if (!menuRef.current) {
      return;
    }

    const observer = new ResizeObserver(() => {
      menuRef.current?.classList.add(styles["no-transition"]);

      requestAnimationFrame(() => {
        menuRef.current?.classList.remove(styles["no-transition"]);
      });
    });

    observer.observe(menuRef.current);

    return () => observer.disconnect();
  }, []);

  // biome-ignore lint: correctness/useExhaustiveDependencies — actionsRef is a stable ref
  useEffect(() => {
    const handlePreventScroll = (e: TouchEvent) => e.preventDefault();
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);

        if (menuWrapperRef.current?.contains(document.activeElement)) {
          btnRef.current?.focus();
        }
      }
    };

    const handleOutsideClick = (e: PointerEvent) => {
      if (!actionsRef.current) {
        return;
      }

      if (!actionsRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("touchmove", handlePreventScroll, {
        passive: false,
      });
      document.addEventListener("keyup", handleEscapeKey);
      document.addEventListener("pointerdown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("touchmove", handlePreventScroll);
      document.removeEventListener("keyup", handleEscapeKey);
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isExpanded]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.currentTarget.classList.contains("active")) {
      setIsExpanded(false);
    }
  };

  return (
    <div className={styles.navbar} ref={menuWrapperRef}>
      <button
        type="button"
        aria-label={t("toggleAriaLabel")}
        aria-expanded={isExpanded}
        aria-controls={navbarId}
        data-navbar-toggle="main"
        className={styles.navbar__toggle}
        onClick={() => setIsExpanded((prev) => !prev)}
        ref={btnRef}
      >
        <span className={styles["navbar__toggle-icon"]} />
      </button>

      <nav id={navbarId} className={styles.navbar__menu} ref={menuRef}>
        <ul className={styles["navbar__list-primary"]}>
          {["home", "phones", "tablets", "accessories"].map((item) => (
            <li key={item}>
              <NavLink
                to={item === "home" ? "/" : item}
                className="btn--nav-left text--uppercase"
                onClick={handleLinkClick}
              >
                {t(item)}
              </NavLink>
            </li>
          ))}
        </ul>

        <ul className={styles["navbar__list-utility"]}>
          <li>
            <NavLink
              to="/favorites"
              aria-label={t("favoriteAriaLabel")}
              className="btn--nav-right"
              onClick={handleLinkClick}
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
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/cart"
              aria-label={t("cartAriaLabel")}
              className="btn--nav-right"
              onClick={handleLinkClick}
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
                <path d="M16 10a4 4 0 0 1-8 0M3.103 6.034h17.794" />
                <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
              </svg>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
