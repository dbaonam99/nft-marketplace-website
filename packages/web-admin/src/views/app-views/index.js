import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = (props) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/dashboard`} component={lazy(() => import(`./dashboard`))} />
        <Route path={`${APP_PREFIX_PATH}/nft-management`} component={lazy(() => import(`./nft-management`))} />
        <Route path={`${APP_PREFIX_PATH}/auction-management`} component={lazy(() => import(`./auction-management`))} />
        <Route path={`${APP_PREFIX_PATH}/artists-management`} component={lazy(() => import(`./artists-management`))} />

        <Redirect to={`${APP_PREFIX_PATH}/dashboard`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews)
