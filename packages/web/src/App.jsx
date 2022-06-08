import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";
import Aos from "aos";
import {
  Activity,
  Auctions,
  Authors,
  ConnectWallet,
  Contact,
  CreateItem,
  Discover,
  Home,
  ItemDetails,
  Profile,
  Login,
  SignUp,
} from "./pages";
import { AuthProvider } from "./auth/account";

import "aos/dist/aos.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/global.css";

import "bootstrap/dist/js/bootstrap.bundle.min";
import MyProfile from "./pages/MyProfile";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="App">
          <Helmet>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>NFT Marketplace</title>
            <link
              href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            />
          </Helmet>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/activity" component={Activity} />
            <Route path="/auctions" component={Auctions} />
            <Route path="/authors" component={Authors} />
            <Route path="/connectWallet" component={ConnectWallet} />
            <Route path="/contact" component={Contact} />
            <Route path="/createitem" component={CreateItem} />
            <Route path="/discover" component={Discover} />
            <Route path="/item-details/:tokenId" component={ItemDetails} />
            <Route path="/profile" component={Profile} />
            <Route path="/my-profile" component={MyProfile} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
