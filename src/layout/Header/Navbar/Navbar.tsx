import type { TFunction } from "i18next";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { Category } from "@/layout/shared/types/category";
import Search from "../Search";
import CartLink from "./CartLink";
import FavouritesLink from "./FavouritesLink";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  categoryKey: Category | undefined;
  isDesktop: boolean;
  actionsRef: React.RefObject<HTMLElement | null>;
  t: TFunction;
  mainRef: React.RefObject<HTMLElement | null>;
  footerRef: React.RefObject<HTMLElement | null>;
  skipRef: React.RefObject<HTMLAnchorElement | null>;
}

const Navbar: React.FC<NavbarProps> = ({
  categoryKey,
  isDesktop,
  actionsRef,
  t,
  mainRef,
  footerRef,
  skipRef,
}) => {
  const { pathname, state } = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: state is not a dependency
  useLayoutEffect(() => {
    if (
      (window.scrollY > 0 && !pathname.startsWith("/product")) ||
      state?.scrollToTop
    ) {
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: all refs are stable
  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);

        if (menuRef.current?.contains(document.activeElement)) {
          toggleRef.current?.focus();
        }
      }
    };

    const handleOutsideClick = (e: PointerEvent) => {
      if (!actionsRef.current?.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isExpanded]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: all refs are stable
  useEffect(() => {
    const customEventName = isExpanded ? "pause-slider" : "resume-slider";
    document.dispatchEvent(new CustomEvent(customEventName));

    if (isDesktop) {
      mainRef.current?.removeAttribute("inert");
      footerRef.current?.removeAttribute("inert");
      skipRef.current?.removeAttribute("inert");
      menuRef.current?.removeAttribute("inert");
    } else {
      mainRef.current?.toggleAttribute("inert", isExpanded);
      footerRef.current?.toggleAttribute("inert", isExpanded);
      skipRef.current?.toggleAttribute("inert", isExpanded);
      menuRef.current?.toggleAttribute("inert", !isExpanded);
    }
  }, [isExpanded, isDesktop]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.currentTarget.classList.contains("active")) {
      setIsExpanded(false);
      toggleRef.current?.focus();
    }
  };

  return (
    <div className={styles.navbar}>
      <button
        type="button"
        aria-label={isExpanded ? t("closeNavLabel") : t("openNavLabel")}
        aria-expanded={isExpanded}
        className={styles.navbar__toggle}
        onClick={() => setIsExpanded((prev) => !prev)}
        ref={toggleRef}
      >
        <span className={styles["navbar__toggle-icon"]} />
      </button>

      <nav
        className={styles.navbar__menu}
        ref={menuRef}
        aria-label={t("mainNavLabel")}
        data-menu-open={isExpanded}
      >
        <ul className={styles["navbar__list-primary"]}>
          {["home", "phones", "tablets", "accessories"].map((item) => (
            <li key={item}>
              <NavLink
                to={item === "home" ? "/" : `/${item}`}
                className="btn--nav-left text--uppercase"
                onClick={handleLinkClick}
              >
                {t(item)}
              </NavLink>
            </li>
          ))}
        </ul>

        {isDesktop && categoryKey && <Search t={t} categoryKey={categoryKey} />}

        <ul className={styles["navbar__list-utility"]}>
          <li>
            <FavouritesLink t={t} onLinkClick={handleLinkClick} />
          </li>

          <li>
            <CartLink t={t} onLinkClick={handleLinkClick} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
