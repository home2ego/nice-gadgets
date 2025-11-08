import type { TFunction } from "i18next";
import type { Slide } from "@/modules/HomePage/slide";

interface ImageProps {
  t?: TFunction;
  slide: Slide;
  hasAlt: boolean;
  isPriority: boolean;
}

const SlideImage: React.FC<ImageProps> = ({ t, slide, hasAlt, isPriority }) => {
  let altText = "";

  if (hasAlt && t) {
    altText = t(slide.alt);
  }

  return (
    <picture>
      <source
        media="(max-width: 440px)"
        type="image/webp"
        srcSet={slide.srcMini}
      />

      <img
        src={slide.src}
        width="600"
        height="400"
        alt={altText}
        fetchPriority={isPriority ? "high" : "low"}
        decoding={isPriority ? "sync" : "async"}
      />
    </picture>
  );
};

export default SlideImage;
