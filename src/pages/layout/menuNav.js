import React, { Component } from "react";
import { Icon } from "antd";
import { NavLink } from "react-router-dom";
import ScrollBar from "components/scrollBar";
import MinTops from "components/minTops";
import style from "./layout.less";
class MenuNav extends Component {
  state = {
    menuList: [
      {
        name: "首页",
        path: "/layout/home",
        icon: "home"
      },
      {
        name: "产品中心",
        icon: "hdd",
        open: true,
        children: [
          {
            name: "发送记录",
            path: "/layout/list"
          },
          {
            name: "产品列表",
            path: "/layout/product_list"
          }
        ]
      },
      {
        name: "账户中心",
        icon: "team",
        open: true,
        children: [
          {
            name: "用户管理",
            path: "/layout/user_list"
          },
          {
            name: "角色管理",
            path: "/layout/role_list"
          }
        ]
      }
    ],
    tips: {
      top: 0,
      name: "",
      show: false
    }
  };

  changeOPen = (e, index) => {
    e.preventDefault();
    this.state.menuList[index].open = !this.state.menuList[index].open;
    this.setState({
      menuList: this.state.menuList
    });
  };

  /* 当左侧菜单为搜索模块时 */
  minShow = (e, item) => {
    e.stopPropagation();
    if (!this.props.menuopen) {
      const e_top = e.currentTarget.getBoundingClientRect();
      this.setState({
        tips: {
          top: e_top.top,
          name: item.name,
          show: true
        }
      });
    }
  };

  minHide = () => {
    if (!this.props.menuopen) {
      this.setState({
        tips: {
          top: 0,
          name: "",
          show: false
        }
      });
    }
  };

  /* 缩小后点击打开左侧 */
  openMenu = () => {
    if (!this.props.menuopen) {
      this.setState({
        tips: {
          top: 0,
          name: "",
          show: false
        }
      });
      this.props.onChangeMenu();
    }
  };

  render() {
    const listItems = this.state.menuList.map((item, index) => {
      if (item.children && item.children.length > 0) {
        return (
          <li key={index} className={!item.open ? style.closeLeve2 : style.openLeve2}>
            <div className={style.menu_a} onClick={e => this.changeOPen(e, index)}>
              <span
                className={style.menu_icon}
                onMouseOver={e => this.minShow(e, item)}
                onMouseOut={this.minHide}
                onClick={this.openMenu}
              >
                <Icon type={item.icon} />
              </span>
              <span className={style.menu_name}>{item.name}</span>
              {this.props.menuopen && (
                <span className={style.menu_arrow}>
                  <Icon type="down" />
                </span>
              )}
            </div>
            {this.props.menuopen && (
              <ul className={style.leve2} style={{ height: `${item.children.length * 48}px` }}>
                {item.children.map((child, child_index) => {
                  return (
                    <li key={child_index}>
                      <NavLink className={style.menu_a} to={child.path}>
                        <span className={style.menu_name}>{child.name}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      } else {
        return (
          <li key={item.name}>
            <NavLink className={style.menu_a} to={item.path}>
              <span
                className={style.menu_icon}
                onMouseOver={e => this.minShow(e, item)}
                onMouseOut={this.minHide}
                onClick={this.openMenu}
              >
                <Icon type={item.icon} />
              </span>
              <span className={style.menu_name}>{item.name}</span>
            </NavLink>
          </li>
        );
      }
    });
    return (
      <div className={`${style.menu}`}>
        <div className={style.menu_logo}>
          {this.props.menuopen ? (
            <img src="https://static.253.com/images/logo_max.png" alt={process.env.title} />
          ) : (
            <img src="https://static.253.com/images/logo_min.png" alt={process.env.title} />
          )}
        </div>
        <div className={style.nav_wrap} id="menuNav">
          <ScrollBar>
            <ul className={style.leve1}>{listItems}</ul>
          </ScrollBar>
        </div>
        <MinTops tips={this.state.tips}></MinTops>
      </div>
    );
  }
}

export default MenuNav;
