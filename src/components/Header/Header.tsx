import { useRef } from "react";
import Logo from "../shared/components/Logo";
import Navbar from "./Navbar";
import LangButton from "./LangButton";
import ThemeButton from "./ThemeButton";
import styles from "./Header.module.scss";

interface HeaderProps {
  normalizedLang: string;
}

const Header: React.FC<HeaderProps> = ({ normalizedLang }) => {
  const actionsRef = useRef<HTMLDivElement>(null);

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Logo />
      </div>

      <div ref={actionsRef} className={styles.header__actions}>
        <Navbar actionsRef={actionsRef} />

        <LangButton normalizedLang={normalizedLang} />

        <ThemeButton />
      </div>
    </header>
  );
};

export default Header;
