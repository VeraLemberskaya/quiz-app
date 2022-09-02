import { injectStyle } from "react-toastify/dist/inject-style";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Provider, ProviderProps } from "react-redux";

import App from "./App";
import "./assets/styles/index.scss";
import { store } from "./services/store";
import { useEffect } from "react";
import { Action } from "@reduxjs/toolkit";
import { setLocation } from "./services/router/slice";

if (typeof window !== "undefined") {
  injectStyle();
}

const withRouter =
  (Provider: (props: ProviderProps<Action<any>>) => JSX.Element) =>
  ({ children, store }: ProviderProps<Action<any>>) => {
    const location = useLocation();

    useEffect(() => {
      store.dispatch(setLocation(location));
    }, [location]);
    return <Provider store={store}>{children}</Provider>;
  };

const ProviderWithRouter = withRouter(Provider);

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <ProviderWithRouter store={store}>
        <App />
      </ProviderWithRouter>
    </BrowserRouter>
  );
}
