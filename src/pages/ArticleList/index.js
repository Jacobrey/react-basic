import React, { Component } from 'react'
import style from "./index.module.scss"
import { Breadcrumb } from "antd"

export default class ArticleList extends Component {
    render() {
        return (
            <div className={style.root}>
                <Breadcrumb
                    items={[
                        {
                            title: 'Home',
                        },
                        {
                            title: 'An Application',
                        },
                    ]}
                />
            </div>
        )
    }
}
