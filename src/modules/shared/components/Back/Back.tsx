import clsx from "clsx";
import type { TFunction } from "i18next";
import { useNavigate } from "react-router-dom";
import Icon from "@/layout/shared/components/Icon";
import styles from "./Back.module.scss";

interface BackProps {
  t: TFunction;
}

const Back: React.FC<BackProps> = ({ t }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={clsx(styles.back, "text--sm")}
      onClick={() => navigate(-1)}
    >
      <Icon>
        <path d="m15 18-6-6 6-6" />
      </Icon>

      {t("back")}
    </button>
  );
};

export default Back;
