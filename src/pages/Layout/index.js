import React, { useEffect, useState } from 'react'
import style from "./index.module.scss"
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Popconfirm, message } from 'antd';

import { Routes, Route, Link } from 'react-router-dom'
import Home from 'pages/Home';
import ArticleList from 'pages/ArticleList';
import ArticlePublish from 'pages/ArticlePublish';
import { removeToken } from 'utils/storage';
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from 'api/user';
const { Header, Content, Sider } = Layout;

export default function LayoutComponent(props) {
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const confirm = (e) => {
        // 移出token
        // console.log(e);
        // localStorage.removeItem("token")
        removeToken()
        // window.location.href = 'http://localhost:3000/login'
        navigate("/login")
        // 跳转到登录页面
        message.success("退出成功！")
    }
    const cancel = (e) => {
        // console.log(e);
        // message.error('Click on No');
    };

    const [name, setName] = useState()
    useEffect(() => {
        const getList = async () => {
            const res = await getUserProfile()
            setName(res.data.name)
            // console.log(res);
        }
        getList()

    })

    return (
        <div className={style.layout}>
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <div className='profile'>
                        <span>{name}</span>
                        <span>
                            <Popconfirm
                                title="你确定退出系统吗？"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="确认"
                                cancelText="取消"
                            >
                                <LogoutOutlined /> 退出
                            </Popconfirm>

                        </span>
                    </div>
                </Header>
                <Layout>
                    <Sider
                        width={200}
                        style={{
                            background: colorBgContainer,
                        }}
                    >
                        <Menu
                            theme='dark'
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{
                                height: '100%',
                                borderRight: 0,
                            }}
                            items={[
                                {
                                    key: '1',
                                    icon: <HomeOutlined />,
                                    label: <Link to="/home">数据概览</Link>,
                                },
                                {
                                    key: '2',
                                    icon: <DiffOutlined />,
                                    label: <Link to="/home/list">内容管理</Link>,
                                },
                                {
                                    key: '3',
                                    icon: <EditOutlined />,
                                    label: <Link to="/home/publish">发布文章</Link>,
                                },
                            ]}
                        />
                    </Sider>
                    <Layout
                        style={{
                            padding: '24px',
                        }}
                    >
                        <Content
                            style={{
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                            }}
                        >
                            <Routes>
                                <Route exact path='/' element={<Home />} />
                                <Route path='home' element={<Home />} />
                                <Route path='list' element={<ArticleList />} />
                                <Route path='publish' element={<ArticlePublish />} />
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )



}
