import React, { Component } from 'react'
import "./index.scss"
import logo from "assets/logo.png"
import { Card, Button, Checkbox, Form, Input } from 'antd';

export default class Login extends Component {
    render() {
        // const onFinish = (values) => {
        //     console.log(values);
        // }
        return (
            <div className='login'>
                <Card className='login-container' >
                    <img className='login-logo' src={logo} alt="" />
                    {/* 表单 */}
                    <Form
                        autoComplete='off'
                        initialValues={{
                            mobile: "13911111111",
                            code: 246810,
                            agree: true
                        }}
                    // onFinish={this.onFinish}
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
                            <Button type="primary" htmlType="submit" block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
