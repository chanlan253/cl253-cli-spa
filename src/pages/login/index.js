import React, { Component } from "react";
import { Form, Icon, Input, Button, message, Spin } from "antd";
import { Link } from "react-router-dom";
import LoginLeft from "components/loginLeft";
import axios from "@/plugins/axios";
import style from "./login.less";
let waitIndex = null; //倒计时索引
let time = 60; //倒计时时间
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, //表单提交中
      codeing: false, //验证码获取中
      msg: "发送验证码" //发送验证码文字
    };
  }

  /* 提交表单 */
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });

    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!err) {
        this.props.history.replace("/layout/home");
        // axios.post("/login", values).then(res => {
        //   this.setState({
        //     loading: false
        //   });
        //   if (res.status === "000000") {
        //     this.props.history.replace("/layout/home");
        //   } else {
        //     message.error(res.msg);
        //   }
        // });
      } else {
        this.setState({
          loading: false
        });
      }
    });
  };

  /* 获取验证码 */
  getCode = () => {
    if (!this.state.codeing) {
      this.setState({
        //防止多次点击
        codeing: true
      });
      axios.post("/login").then(res => {
        this.setState({
          //不管错误与否，先恢复
          codeing: false
        });
        if (res.status === "000000") {
          this.codeWait(); //开始倒计时
        } else {
          message.error(res.msg);
        }
      });
    }
  };

  /* 倒计时判断 */
  codeWait = () => {
    this.setState({
      codeing: true,
      msg: `重新获取(${time})`
    });
    if (time > 0) {
      clearTimeout(waitIndex);
      waitIndex = setTimeout(() => {
        time--;
        this.codeWait();
      }, 1000);
    } else {
      clearTimeout(waitIndex);
      time = 60;
      this.setState({
        codeing: false,
        msg: `发送验证码`
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.login_wrap}>
        <div className={style.login_left}>
          <LoginLeft />
        </div>
        <div className={style.login_right}>
          <div className={`${style.login_form} login-form`}>
            <h2>欢迎登录</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "账号不能为空" }]
                })(<Input size="large" placeholder="请输入您的账号" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "密码不能为空" }]
                })(<Input size="large" type="password" placeholder="请输入您的密码" />)}
              </Form.Item>
              <Form.Item className={style.code}>
                <Input.Group compact>
                  {getFieldDecorator("code", {
                    rules: [{ required: true, message: "验证码不能为空" }]
                  })(<Input size="large" placeholder="请输入您的验证码" />)}
                  <div
                    className={`${style.getcode} ${this.state.codeing ? style.disabled : ""}`}
                    onClick={this.getCode}
                  >
                    {this.state.msg}
                  </div>
                </Input.Group>
              </Form.Item>
              <Form.Item>
                <Button
                  size="large"
                  block
                  type="primary"
                  htmlType="submit"
                  className={style["login-form-button"]}
                  disabled={this.state.loading}
                >
                  <span>登录</span>
                  <span>
                    {this.state.loading ? (
                      <Spin indicator={<Icon type="loading" style={{ fontSize: 16, color: "#fff" }} spin />} />
                    ) : (
                      <Icon type="arrow-right" />
                    )}
                  </span>
                </Button>
              </Form.Item>
              <div className={style.other}>
                <Link to="/regist">注册新账号</Link>
                <Link to="/forgot">忘记密码？</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: "login" })(LoginForm);
