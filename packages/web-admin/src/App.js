import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Views from './views';
import { Route, Switch } from 'react-router-dom';
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { THEME_CONFIG } from './configs/AppConfig';
import { MoralisProvider } from "react-moralis";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};
function App() {
  return (
    <div className="App">
      <MoralisProvider
        appId="Avri8wAWWBtxABoSRxUkgTxhj3ThZ06aezKxJIXf"
        serverUrl="https://2l73cwdg74st.usemoralis.com:2053/server"
      >
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ThemeSwitcherProvider themeMap={themes} defaultTheme={THEME_CONFIG.currentTheme} insertionPoint="styles-insertion-point">
              <Router>
                <Switch>
                  <Route path="/" component={Views} />
                </Switch>
              </Router>
            </ThemeSwitcherProvider>
          </Provider>
        </QueryClientProvider>
      </MoralisProvider>
    </div>
  );
}

export default App;
