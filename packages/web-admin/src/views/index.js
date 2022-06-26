import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from 'layouts/auth-layout';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import useBodyClass from 'hooks/useBodyClass';
import { useMoralis } from "react-moralis";

function RouteInterceptor({ children, ...rest }) {
  const { isAuthenticated } = useMoralis();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: AUTH_PREFIX_PATH,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export const Views = (props) => {
  const { token, location, direction } = props;
  useBodyClass(`dir-${direction}`);
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={APP_PREFIX_PATH} />
      </Route>
      <Route path={AUTH_PREFIX_PATH}>
        <AuthLayout direction={direction} />
      </Route>
      <RouteInterceptor path={APP_PREFIX_PATH} isAuthenticated={token}>
        <AppLayout direction={direction} location={location} isAuthenticated={token} />
      </RouteInterceptor>
    </Switch>
  )
}


const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } = theme;
  const { token } = auth;
  return { locale, direction, token }
};
export default withRouter(connect(mapStateToProps)(Views));