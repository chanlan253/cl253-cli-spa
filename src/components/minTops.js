import React, { Component } from "react";
import style from "pages/layout/layout.less";
export default (props) => {
  return (
    <div
      className={style.mintips_wrap}
      style={{ top: props.tips.top + 10, display: props.tips.show ? "block" : "none" }}
    >
      {props.tips.name}
    </div>
  );
};
