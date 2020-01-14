import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import PageLoad from "components/pageLoad";
import { Provider } from "react-redux";
import { reducers } from "./redux";
import routers from "./router";
import "assets/style/style";
import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
const store = createStore(reducers);
ReactDOM.render(
  <ConfigProvider locale={zh_CN} autoInsertSpaceInButton={false}>
    <Provider store={store}>
      <Suspense fallback={<PageLoad />}>
        <BrowserRouter basename={process.env.baseName}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            {routers.map(item => {
              return <Route component={item.component} path={item.path} key={item.name} exact={item.exact || false} />;
            })}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </Provider>
  </ConfigProvider>,
  document.getElementById("app")
);
