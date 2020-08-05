import React, { useState, useMemo, useEffect } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import MyIcon from "components/myIcon";
import { Link, useHistory } from "react-router-dom";
import LoginLeft from "components/loginLeft";
import axios from "@/plugins/axios";
import style from "./login.less";
import Countdown from "antd/lib/statistic/Countdown";
const Login = () => {
  const [form] = Form.useForm();
  /* 倒计时 */
  const [codeDisabled, setCodeDisabled] = useState(false); //获取验证码禁用状态
  const [waitTime, setWaitTime] = useState(0); //倒计时时间
  //倒计时显示的文字
  const waitMessage = useMemo(() => {
    if (waitTime === 0) {
      setCodeDisabled(false);
      return "获取验证码";
    } else {
      return `重新获取(${waitTime})`;
    }
  }, [waitTime]);
  useEffect(() => {
    let waitIndex = setTimeout(() => {
      if (waitTime > 0) {
        setWaitTime((c) => c - 1);
      } else {
        clearTimeout(waitIndex);
      }
    }, 1000);
    return () => {
      clearTimeout(waitIndex);
    };
  }, [waitTime]);

  /* 点击获取验(证码 */
  const getCode = () => {
    form
      .validateFields(["username", "password"])
      .then((values) => {
        setCodeDisabled(true);
        axios
          .post("/getcode", values)
          .then((res) => {
            if (res.code === "000000") {
              setWaitTime(10);
              message.success(res.msg);
            } else {
              setCodeDisabled(false);
            }
          })
          .catch((err) => {
            setCodeDisabled(false);
          });
      })
      .catch(() => {});
  };

  /* 点击登录提交表单 */
  const [loading, setLoading] = useState(false); //登录按钮禁用状态
  const history = useHistory();
  const onFinish = (values) => {
    history.push("/home");
  };

  return (
    <div className={style.login_wrap}>
      <div className={style.login_left}>
        <LoginLeft />
      </div>
      <div className={style.login_right}>
        <div className={`${style.login_form} login-form`}>
          <h2>欢迎登录</h2>
          <Form onFinish={onFinish} form={form}>
            <Form.Item name="username" rules={[{ required: true, message: "账号不能为空" }]}>
              <Input size="large" placeholder="请输入您的账号" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "密码不能为空" }]}>
              <Input.Password placeholder="请输入您的密码" size="large" />
            </Form.Item>
            <Form.Item>
              <div className={style.code}>
                <Form.Item name="code" noStyle rules={[{ required: true, message: "验证码不能为空" }]}>
                  <Input placeholder="验证码" size="large" />
                </Form.Item>
                <Button
                  size="large"
                  disabled={codeDisabled}
                  block
                  onClick={() => {
                    getCode();
                  }}
                >
                  {waitMessage}
                </Button>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                size="large"
                block
                type="primary"
                htmlType="submit"
                className={style["login-form-button"]}
                disabled={loading}
              >
                <span>登录</span>
                <span>
                  {loading ? (
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                  ) : (
                    <MyIcon type="jiantou" />
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
};

export default Login;
