import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { focusElement } from "../../utils/focusElement";
import styles from "./SkipLink.module.scss";

interface SkipProps {
  mainRef?: React.RefObject<HTMLElement | null>;
  elementRef?: React.RefObject<HTMLElement | null>;
  content: string;
  classAttr: string;
}

const SkipLink: React.FC<SkipProps> = ({
  mainRef,
  elementRef,
  content,
  classAttr,
}) => {
  const { t } = useTranslation();

  const handleSkipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (mainRef?.current) {
      focusElement(mainRef.current);
      window.scrollTo({ top: 0 });
    }

    if (elementRef?.current) {
      focusElement(elementRef.current);
      elementRef.current.scrollIntoView();
    }
  };

  return (
    <a
      href="#"
      className={clsx(styles[classAttr], "sr-skip-link", "text--uppercase")}
      onClick={handleSkipToContent}
    >
      {t(content)}
    </a>
  );
};

export default SkipLink;
