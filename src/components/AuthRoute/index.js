import React, { Children, Component } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { hasToken } from 'utils/storage';
import Layout from "../../pages/Layout";
export default class AuthRoute extends Component {

    render() {

        return (
            <Children path="/home/*" element={!hasToken ? (<Navigate to="/login"></Navigate>) : <Layout></Layout>}></Children>
        )
    }
}
