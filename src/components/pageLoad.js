import React from "react";
import { Spin } from "antd";
export default () => {
  return (
    <div className="pageLoad">
      <Spin size="large" tip="页面加载中..." />
    </div>
  );
};
