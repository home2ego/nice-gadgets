import type { TFunction } from "i18next";
import moon from "@/assets/moon.svg";
import sun from "@/assets/sun.svg";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { toggleTheme } from "@/core/store/theme/themeSlice";

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
      aria-checked={mode !== "light"}
      className="btn--theme"
      onClick={() => dispatch(toggleTheme())}
    >
      <span>
        <img
          src={mode !== "light" ? sun : moon}
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
