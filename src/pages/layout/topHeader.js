import React, { Component } from "react";
import { Icon, Badge, Menu, Dropdown } from "antd";
import headDefault from "assets/images/header_default.png";
import style from "./layout.less";
class TopHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userDown = (
      <Menu>
        <Menu.Item>
          <div className="downlist">设置头像</div>
        </Menu.Item>
        <Menu.Item>
          <div className="downlist">退出系统</div>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={style.head_wrap} id="topheader">
        <div className={style.open_menu_btn} onClick={this.props.onChangeMenu}>
          {this.props.menuopen ? <Icon type="menu-fold" /> : <Icon type="menu-unfold" />}
        </div>
        <div className={style.head_ele}>
          <div className={style.ele_list}>财务中心</div>
          <div className={style.ele_list}>文档中心</div>
          <div className={style.ele_list}>
            <Badge count={0} dot>
              <Icon type="vertical-align-bottom" style={{ fontSize: "18px" }} />
            </Badge>
          </div>
          <div className={style.ele_list}>
            <Badge count={2} dot>
              <Icon type="bell" style={{ fontSize: "18px" }} />
            </Badge>
          </div>
          {/*基本信息*/}
          <div className={`${style.ele_list} ${style.userinfo}`}>
            <Dropdown overlay={userDown} placement="bottomLeft" trigger={["click"]} overlayClassName="user_info_down">
              <div className={style.baseinfo}>
                <div className={style.img}>
                  <img src={headDefault} alt="用户头像" />
                </div>
                <div className={style.txt}>
                  <p>15121060862</p>
                  <p className={style.company}>
                    <span>上海创蓝文化传播有限公司</span>
                    <Icon type="caret-down" />
                  </p>
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}
export default TopHeader;
