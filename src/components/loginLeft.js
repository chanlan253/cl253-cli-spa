import React from "react";
import moment from "moment";
import style from "pages/login/login.less";
export default () => {
  return (
    <div className={style.login_banner}>
      <div className={style.footer_txt}>CopyRight © 2012-{moment().format("YYYY")} ALL Rights Reserved</div>
    </div>
  );
};
