import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import CreatArticle from "./pages/CreatArticle";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const navigate = useNavigate("");
  const token = localStorage.getItem("access_token");

  function ProtectedRoute({children}) {
    if (!token) {
      return navigate("/login");
    }
    return children
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home></Home></ProtectedRoute>}></Route>
        <Route
          path="/articledetails/:id"
          element={<ProtectedRoute><ArticleDetail></ArticleDetail></ProtectedRoute>}
        ></Route>
        <Route
          path="/creatarticle"
          element={<ProtectedRoute><CreatArticle></CreatArticle></ProtectedRoute>}
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </div>
  );
}

export default App;
