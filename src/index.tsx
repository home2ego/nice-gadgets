import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import Root from "@/core/router/Root";
import store from "@/core/store";
import { ToastProvider } from "./core/context/ToastProvider";
import "@/core/i18n";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <Root />
      </ToastProvider>
    </Provider>
  </StrictMode>,
);
