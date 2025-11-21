import type { TFunction } from "i18next";

export interface LinkProps {
  t: TFunction;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
