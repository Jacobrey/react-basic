import React, { Component } from 'react'
import style from "./index.module.scss"
import logo from "assets/logo.png"
import { Card, Button, Checkbox, Form, Input, message } from 'antd';
import { login } from 'api/user';
import { setToken } from 'utils/storage';

export default class Login extends Component {
    state = {
        // 加载状态
        loading: false
    }

    render() {
        return (
            <div className={style.login}>
                <Card className='login-container' >
                    <img className='login-logo' src={logo} alt="" />
                    {/* 表单 */}
                    <Form
                        size='large'
                        autoComplete='off'
                        validateTrigger={["onChange", "onBlur"]}
                        initialValues={{
                            mobile: "13911111111",
                            code: "246810",
                            agree: true
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="mobile"
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                                {
                                    required: true,
                                    message: "请输入手机号"
                                },
                                {
                                    pattern: /^1[3-9]\d{9}$/,
                                    message: '手机号格式错误',
                                    validateTrigger: "onBlur"
                                }
                            ]}
                        >
                            <Input placeholder='请输入你的手机号' />
                        </Form.Item>

                        <Form.Item
                            name="code"
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                                {
                                    required: true,
                                    message: "请输入验证码"
                                },
                                {
                                    pattern: /^\d{6}$/,
                                    message: '手机号格式错误'
                                }
                            ]}
                        >
                            <Input placeholder='请输入验证码' />
                        </Form.Item>

                        <Form.Item
                            valuePropName='checked'
                            name="agree"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value
                                            ? Promise.resolve()
                                            : Promise.reject(new Error("请勾选同意事项"))
                                }
                            ]}
                        >
                            <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={this.state.loading} block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }

    onFinish = async ({ mobile, code }) => {
        this.setState({
            loading: true
        })
        try {
            // console.log(mobile, code);
            const res = await login(mobile, code)
            // console.log(res);
            // 提示消息
            message.success("登录成功！", 1, () => {
                // 登录成功
                // 1、保存token
                // localStorage.setItem("token", res.data.token)
                setToken(res.data.token)
                // 2、跳转到 /home
                window.location.href = 'http://localhost:3000/home'
            })
        } catch (error) {
            // console.log(error);
            message.error(error.response.data.message, 1, () => {
                this.setState({
                    loading: false
                })
            })
        }

    }
}
