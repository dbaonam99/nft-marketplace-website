import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const artistsManagement = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          exact
          path={`${match.url}`}
          component={lazy(() => import(`./list`))}
        />
        <Redirect from={`${match.url}`} to={`${match.url}`} />
      </Switch>
    </Suspense>
  )
};

export default artistsManagement;