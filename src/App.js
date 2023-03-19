import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from "./pages/Layout";
import Login from "pages/Login";
function App() {
  return (
    <Router>
      <div className="App">
        <Login></Login>
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
