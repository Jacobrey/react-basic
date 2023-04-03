import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import AuthRoute from 'components/AuthRoute';
import Layout from "./pages/Layout";
import Login from "pages/Login";
// import AuthRoute from 'components/AuthRoute';
import { hasToken } from 'utils/storage';
// import { history } from 'utils/history';
function App() {

  return (
    <Router>
      <div className="App">
        {/* <Login></Login> */}
        {/* 配置路由规则 */}
        <Routes>
          <Route path="/home/*" element={!hasToken() ? (<Navigate to="/login"></Navigate>) : <Layout></Layout>}></Route>
          {/* <AuthRoute></AuthRoute> */}
          <Route path="/login/*" element={<Login></Login>}></Route>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
