import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Navbar from "./components/shared/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="p-6 text-center">Đang tải...</div>}>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
