import React, { Component } from 'react'
import style from "./index.module.scss"
import { Breadcrumb, Card, Form, Radio, Button, DatePicker, Table, Tag, Tooltip, Space, Modal, message } from "antd"
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { ArticleStatus } from 'api/constants'

import { delArticle, getArticles } from 'api/article'
import defaultImg from 'assets/error.png'
import Channel from 'components/Channel';

const { RangePicker } = DatePicker;

export default class ArticleList extends Component {

    columns = [
        {
            title: '封面',
            render(data) {
                if (data.cover.type === 0) {
                    // 无图,渲染按默认图片
                    return <img src={defaultImg} alt='' style={{ width: 200, height: 150, objectFit: 'cover' }} />
                }
                // 有图
                return <img src={data.cover.images[0]} alt="" style={{ width: 200, height: 150, objectFit: 'cover' }} />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render(status) {
                const obj = ArticleStatus.find((item) => item.id === status)
                return <Tag color={obj.color}>
                    {obj.name}
                </Tag>
            }
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate',
            key: 'pubdate',
        },
        {
            title: '阅读数',
            dataIndex: 'read_count',
            key: 'read_count',
        },
        {
            title: '评论数',
            dataIndex: 'comment_count',
            key: 'comment_count',
        },
        {
            title: '点赞数',
            dataIndex: 'like_count',
            key: 'like_count',
        },
        {
            title: '操作',
            render: (data) => {
                return <Space>
                    <Tooltip>
                        <Button type="primary" shape="circle" icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip>
                        <Button type="primary" shape="circle" danger icon={< DeleteOutlined />} onClick={() => this.handleDelete(data.id)} />
                    </Tooltip>
                </Space>

            }
        },
    ];
    // 用于查询文章列表的所有的参数
    reqParams = {
        page: 1,
        per_page: 10,
    }
    state = {
        articles: {}
    }
    render() {
        const { total_count, results, per_page, page } = this.state.articles
        return (
            <div className={style.root}>
                <Card title={
                    <Breadcrumb
                        items={[
                            {
                                title: <Link to="/home">首页</Link>,
                            },
                            {
                                title: <Link to="/home/publish">文章列表</Link>,
                            },
                        ]}
                    />
                }>
                    {/* 表单 */}
                    <Form initialValues={{ status: -1 }} onFinish={this.onFinish}>
                        <Form.Item label="状态" name="status">
                            <Radio.Group>
                                {
                                    ArticleStatus.map((item) => (
                                        <Radio key={item.id} value={item.id}>{item.name}</Radio>
                                    ))
                                }
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item label="频道" name="channel_id">
                            <Channel></Channel>
                        </Form.Item>

                        <Form.Item label="日期" name="date">
                            <RangePicker />
                        </Form.Item>

                        <Form.Item className='item'>
                            <Button type="primary" htmlType='submit'>筛选</Button>
                        </Form.Item>
                    </Form>

                </Card>

                <Card title={`根据筛选条件查询到${total_count}条结果`}>
                    <Table dataSource={results} columns={this.columns} rowKey="id"
                        pagination={{
                            total: total_count,
                            pageSize: per_page,
                            current: page,
                            onChange: this.onChange,
                        }}
                    />;
                </Card>

            </div>
        )
    }

    onChange = (page, pageSize) => {
        console.log(page, pageSize);
        this.reqParams.page = page
        this.reqParams.per_page = pageSize
        this.getArticleList()

    }




    // 获取文章数据
    async getArticleList() {
        const res = await getArticles(this.reqParams)
        console.log(res);
        this.setState({
            articles: res.data,
        })

    }

    onFinish = ({ status, channel_id, date }) => {
        if (status !== -1) {
            this.reqParams.status = status
        } else {
            delete this.reqParams.status
        }
        if (channel_id !== undefined) {
            this.reqParams.channel_id = channel_id
        } else {
            delete this.reqParams.channel_id
        }
        if (date) {
            this.reqParams.begin_pubdate = date[0].startOf("day").format("YYYY-MM-DD")
            this.reqParams.end_pubdate = date[1].endOf("day").format("YYYY-MM-DD")
        } else {
            delete this.reqParams.begin_pubdata
            delete this.reqParams.end_pubdata
        }
        // 如果是查询的操作，需要让页码值重新为1
        this.reqParams.page = 1
        // 重新发送请求
        this.getArticleList()
        console.log(this.reqParams);
    }
    onGenderChange = () => {
        console.log("!");
    }

    handleDelete = (id) => {
        // console.log(id)
        Modal.confirm({
            title: '温馨提示',
            icon: <ExclamationCircleOutlined />,
            content: '此操作将永久删除该文章, 是否继续?',
            // 注意：此处，需要使用箭头函数，否则，会有 this 指向的问题
            onOk: async () => {
                // 发送请求。删除文章
                await delArticle(id)
                // console.log(res);
                this.getArticleList()
                message.success("删除成功！")

            },
            onCancel() {
                // 取消按钮的回调
                console.log('Cancel')
            }
        })
    }

}

