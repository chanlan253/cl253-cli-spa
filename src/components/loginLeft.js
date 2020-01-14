import React, { Component } from "react";
import moment from "moment";
import style from "pages/login/login.less";
class LoginLeft extends Component {
  render() {
    return (
      <div className={style.login_banner}>
        <div className={style.footer_txt}>CopyRight © 2012-{moment().format("YYYY")} ALL Rights Reserved</div>
      </div>
    );
  }
}
export default LoginLeft;
