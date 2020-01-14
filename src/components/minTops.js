import React, { Component } from "react";
import style from "pages/layout/layout.less";
class MinTops extends Component {
  render() {
    return (
      <div
        className={style.mintips_wrap}
        style={{ top: this.props.tips.top + 10, display: this.props.tips.show ? "block" : "none" }}
      >
        {this.props.tips.name}
      </div>
    );
  }
}
export default MinTops;
