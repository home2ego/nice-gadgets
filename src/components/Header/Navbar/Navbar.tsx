import type { TFunction } from "i18next";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  actionsRef: React.RefObject<HTMLElement | null>;
  t: TFunction;
  mainRef: React.RefObject<HTMLElement | null>;
  footerRef: React.RefObject<HTMLElement | null>;
  skipRef: React.RefObject<HTMLAnchorElement | null>;
}

const Navbar: React.FC<NavbarProps> = ({
  actionsRef,
  t,
  mainRef,
  footerRef,
  skipRef,
}) => {
  const { pathname } = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname triggers scroll on route change
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: all refs are stable
  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handlePreventScroll = (e: TouchEvent) => e.preventDefault();

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

    document.addEventListener("touchmove", handlePreventScroll, {
      passive: false,
    });
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("touchmove", handlePreventScroll);
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isExpanded]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: all refs are stable
  useEffect(() => {
    const customEventName = isExpanded ? "pause-slider" : "resume-slider";
    document.dispatchEvent(new CustomEvent(customEventName));

    const mq = window.matchMedia("(min-width: 1136px)");

    const handleChange = () => {
      const isDesktop = mq.matches;

      if (isDesktop) {
        mainRef.current?.removeAttribute("inert");
        footerRef.current?.removeAttribute("inert");
        skipRef.current?.removeAttribute("inert");
        menuRef.current?.removeAttribute("inert"); // Instant tab removal; visibility:hidden fades late.
      } else {
        mainRef.current?.toggleAttribute("inert", isExpanded);
        footerRef.current?.toggleAttribute("inert", isExpanded);
        skipRef.current?.toggleAttribute("inert", isExpanded);
        menuRef.current?.toggleAttribute("inert", !isExpanded);
      }
    };

    handleChange();
    mq.addEventListener("change", handleChange);

    return () => {
      mq.removeEventListener("change", handleChange);
    };
  }, [isExpanded]);

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
        aria-expanded={isExpanded ? "true" : "false"}
        data-navbar-toggle="main"
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
      >
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
              aria-label={t("favoriteLabel")}
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
              aria-label={t("cartLabel")}
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
