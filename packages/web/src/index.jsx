import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import i18n from "./translation/i18n";
import { I18nextProvider } from "react-i18next";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <MoralisProvider
    appId="Avri8wAWWBtxABoSRxUkgTxhj3ThZ06aezKxJIXf"
    serverUrl="https://2l73cwdg74st.usemoralis.com:2053/server"
  >
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </MoralisProvider>,
  document.getElementById("root")
);

reportWebVitals();
