import { useTranslation } from "react-i18next";
import type { Slide } from "../../../types/slide";

interface ImageProps {
  slide: Slide;
  hasAlt: boolean;
  isPriority: boolean;
}

const SlideImage: React.FC<ImageProps> = ({ slide, hasAlt, isPriority }) => {
  const { t } = useTranslation("homePage");

  return (
    <img
      src={slide.src}
      srcSet={`${slide.srcMini} 640w, ${slide.src} 1920w`}
      sizes="(max-width: 591px) 100vw, 100%"
      width="684"
      height="400"
      alt={hasAlt ? t(slide.alt) : ""}
      loading={isPriority ? "eager" : "lazy"}
      fetchPriority={isPriority ? "high" : "low"}
    />
  );
};

export default SlideImage;
