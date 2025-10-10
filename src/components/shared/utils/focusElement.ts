export function focusElement(el: HTMLElement) {
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  el.addEventListener("blur", () => el.removeAttribute("tabindex"), {
    once: true,
  });
}
