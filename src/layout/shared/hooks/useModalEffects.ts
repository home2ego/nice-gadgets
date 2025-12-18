import { useEffect } from "react";

export function useModalEffects(
  isOpen: boolean,
  onClose: () => void,
  focusEl: HTMLElement | null,
) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: focusEl is intentionally excluded
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const app = document.querySelector(".App") as HTMLElement;
    app.inert = true;
    focusEl?.focus();

    return () => {
      app.inert = false;
    };
  }, [isOpen]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: onClose is intentionally excluded
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);
}
