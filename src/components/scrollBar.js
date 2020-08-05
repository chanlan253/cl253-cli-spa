import React from "react";
import style from "pages/layout/layout.less";
export default (props) => {
  return (
    <div className={style.scrollbar}>
      <div className={style.scroll_wrap}>{props.children}</div>
    </div>
  );
};
