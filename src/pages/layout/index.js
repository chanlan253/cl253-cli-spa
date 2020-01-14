import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import style from "./layout.less";
import MenuNav from "./menuNav";
import TopHeader from "./topHeader";
import RouterList from "@/router";
class Layout extends Component {
  state = {
    menuOpen: true
  };
  changeMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  };
  render() {
    return (
      <div className={`${style.layout_wrap} ${!this.state.menuOpen ? style.min_menux : ""}`}>
        <MenuNav menuopen={this.state.menuOpen} onChangeMenu={this.changeMenu} />
        <TopHeader onChangeMenu={this.changeMenu} menuopen={this.state.menuOpen} />
        <div className={style.content_wrap}>
          <Switch>
            {RouterList[1].childrens.map(item => (
              <Route component={item.component} path={item.path} key={item.name} />
            ))}
          </Switch>
        </div>
      </div>
    );
  }
}

export default Layout;
