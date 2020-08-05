import React, { Suspense } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import PageLoad from "components/pageLoad";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import moment from "moment";
import "moment/locale/zh-cn";
import "assets/style/style.less";
import routers from "./router";

moment.locale("zh-cn");

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Suspense fallback={<PageLoad />}>
          <BrowserRouter basename={process.env.baseName}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/login" />} />
              {routers.map((item) => {
                return (
                  <Route component={item.component} path={item.path} key={item.name} exact={item.exact || false} />
                );
              })}
            </Switch>
          </BrowserRouter>
        </Suspense>
      </Provider>
    </ConfigProvider>
  );
};

render(<App />, document.getElementById("app"));
