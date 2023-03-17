import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Layout from "./pages/Layout";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/login">登录</Link>
        <Link to="/home">首页</Link>
        {/* 配置路由规则 */}
        <Routes>
          <Route path="/home" element={<Layout></Layout>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
