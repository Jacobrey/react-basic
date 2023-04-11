import React, { Component } from 'react'
import style from "./index.module.scss"
import { Card, Breadcrumb, Form, Button, Space, Input, Radio, Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"
import Channel from 'components/Channel';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { baseURL } from 'utils/request'
import { addAritcle } from "api/article"
export default class ArticlePublish extends Component {
    state = {
        // 文章封面类型
        type: 1,
        fileList: [],
        previewOpen: false,
        previewUrl: ''
    }
    formRef = React.createRef()
    render() {
        const { type, fileList, previewOpen, previewUrl } = this.state
        return (
            <div className={style.root}>
                <Card>
                    <Breadcrumb
                        items={[
                            {
                                title: <Link to="/home">首页</Link>,
                            },
                            {
                                title: <Link to="/home/publish">发布文章</Link>,
                            },
                        ]}
                    />
                    <Form
                        ref={this.formRef}
                        labelCol={{ span: 4 }}
                        size="large"
                        onFinish={this.onFinish}
                        validateTrigger={['onBlur', 'onChange']}
                        initialValues={{
                            content: '',
                            type: this.state.type
                        }}
                    >
                        <Form.Item
                            label="标题"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: '文章的标题不能为空',
                                }
                            ]}
                        >
                            <Input style={{ width: 400 }} placeholder='请输入文章标题'></Input>
                        </Form.Item>
                        <Form.Item
                            label="频道"
                            name="channel_id"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择频道',
                                }
                            ]}
                        >
                            <Channel></Channel>
                        </Form.Item>
                        <Form.Item label="封面" name="type">
                            <Radio.Group onChange={this.changeImageType}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                                {/* <Radio value={-1}>自动</Radio> */}
                            </Radio.Group>
                        </Form.Item>
                        {/* 上传图片 */}
                        <Form.Item wrapperCol={{ offset: 4 }}>
                            {
                                // fileList:控制文件列表
                                // action:控制上传的url保证是一个完整的url
                                // name: 用于指定名字
                                type !== 0 && (<Upload
                                    action={`${baseURL}/upload`}
                                    listType="picture-card"
                                    fileList={fileList}
                                    name="image"
                                    onPreview={this.handlePreview}
                                    onChange={this.UploadImage}
                                    beforeUpload={this.beforeUpload}
                                >
                                    {
                                        fileList.length < type && <PlusOutlined />
                                    }
                                </Upload>)
                            }
                        </Form.Item>
                        <Form.Item
                            label="内容"
                            name="content"
                            rules={[{ required: true, message: '请输入文章内容' }]}
                        >
                            <ReactQuill
                                // className="publish-quill"
                                theme="snow"
                                placeholder="请输入文章内容"
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4 }}>
                            <Space>
                                <Button type='primary' size="large" htmlType='submit'>发布文章</Button>
                                <Button size="large" onClick={this.addDraft} >存入草稿</Button>
                            </Space>

                        </Form.Item>
                    </Form>
                </Card>

                <Modal open={previewOpen} title="图片预览" footer={null} onCancel={this.handleCancel}>
                    <img
                        alt="example"
                        style={{
                            width: '100%',
                        }}
                        src={previewUrl}
                    />
                </Modal>
            </div>
        )
    }
    async save(values, draft) {
        const { fileList, type } = this.state
        if (fileList.length !== type) {
            return message.warning('上传的图片数量不正确')
        }
        const images = fileList.map((item) => {
            return item.url || item.response.data.url
        })
        // 添加文章
        await addAritcle(
            {
                ...values,
                cover: {
                    images,
                    type,
                }
            },
            draft
        )
        message.success("添加成功")
        window.location.href = 'http://localhost:3000/home/list'
    }

    onFinish = async (values) => {
        this.save(values, false)

    }
    addDraft = async () => {
        const values = await this.formRef.current.validateFields()
        this.save(values, true)
    }
    changeImageType = (e) => {
        // console.log(e);
        this.setState({
            type: e.target.value,
            fileList: []
        })
    }
    handlePreview = async (file) => {
        const url = file.url || file.response.data.url
        // console.log(file);
        this.setState({
            previewOpen: true,
            previewUrl: url
        })
    };
    handleCancel = () => {
        this.setState({
            previewOpen: false,
            previewUrl: ""
        })
    }
    UploadImage = ({ fileList }) => {
        this.setState({
            fileList,
        })
    }
    // 上传时的校验
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
}
