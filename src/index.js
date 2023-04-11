import React from 'react';
import ReactDOM from 'react-dom/client';
// 导入Antd的全局样式
import 'antd/dist/reset.css'
// 自己的全局样式
import './index.css';
import App from './App';
// 国际化配置
import { ConfigProvider } from "antd"
// import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={locale}>
    <App />
  </ConfigProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

