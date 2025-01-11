import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import CreatArticle from "./pages/CreatArticle";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const token = localStorage.getItem("access_token");

  function ProtectedRoute({ children }) {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/articledetails/:id"
          element={
            <ProtectedRoute>
              <ArticleDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/creatarticle"
          element={
            <ProtectedRoute>
              <CreatArticle />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
