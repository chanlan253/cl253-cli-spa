import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import style from "./layout.less";
import RouterList from "@/router";

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <div className={`${style.layout_wrap} ${!menuOpen ? style.min_menux : ""}`}>
      <div className={style.content_wrap}>
        <Switch>
          {RouterList[1].childrens.map((item) => (
            <Route component={item.component} path={item.path} key={item.name} />
          ))}
        </Switch>
      </div>
    </div>
  );
};
export default Layout;
