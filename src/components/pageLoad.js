import React, { Component } from "react";
import { Spin } from "antd";
class PageLoad extends Component {
  render() {
    return (
      <div className="pageLoad">
        <Spin size="large" tip="页面加载中..." />
      </div>
    );
  }
}
export default PageLoad;
