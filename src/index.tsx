import { useEffect } from "react";
import { Action } from "@reduxjs/toolkit";

import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Provider, ProviderProps } from "react-redux";

import App from "./App";
import "./assets/styles/index.scss";
import { store } from "./store/store";

import { setLocation } from "./store/reducers/routerReducer";

const withRouter =
  (Provider: (props: ProviderProps<Action<any>>) => JSX.Element) =>
  ({ children, store }: ProviderProps<Action<any>>) => {
    const location = useLocation();

    useEffect(() => {
      store.dispatch(setLocation(location));
    }, [location, store]);
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
