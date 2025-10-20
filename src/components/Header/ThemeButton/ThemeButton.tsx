import type { TFunction } from "i18next";
import moon from "../../../assets/icons/moon.svg";
import sun from "../../../assets/icons/sun.svg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { toggleTheme } from "../../../store/theme/themeSlice";

interface ThemeProps {
  t: TFunction;
}

const ThemeButton: React.FC<ThemeProps> = ({ t }) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <button
      type="button"
      role="switch"
      aria-label={t("themeLabel")}
      aria-checked={mode === "light" ? "false" : "true"}
      className="btn--theme"
      onClick={() => dispatch(toggleTheme())}
    >
      <span>
        <img
          src={mode === "light" ? moon : sun}
          alt=""
          width="16"
          height="16"
          decoding="async"
        />
      </span>
    </button>
  );
};

export default ThemeButton;
