import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import i18n from './translation/i18n';
import { I18nextProvider } from "react-i18next";

ReactDOM.render(
  <BrowserRouter>
      <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
