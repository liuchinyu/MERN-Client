import React from "react";
import { useNavigate } from "react-router-dom";
// import LoginComponent from "./login-component";

const HomeComponent = () => {
  const navigate = useNavigate();

  const handleToLogin = () => {
    navigate("/login");
  };

  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">課程系統</h1>
            <p className="col-md-8 fs-4">
              本系統使用 React.js 作為前端框架，Node.js、MongoDB
              作為後端服務器。作為一名講師可以新增課程，學生可以註冊課程。
            </p>
            <button
              className="btn btn-primary btn-lg"
              type="button"
              onClick={handleToLogin}
            >
              開始使用系統。
            </button>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>作為一個學生</h2>
              <p>
                學生可以註冊他們喜歡的課程。本網站僅供練習之用，請勿提供任何個人資料，例如信用卡號碼。
              </p>
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={handleToLogin}
              >
                登錄會員、或者註冊一個帳號
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>作為一個導師</h2>
              <p>
                您可以通過註冊成為一名講師，並開始製作在線課程。本網站僅供練習之用，請勿提供任何個人資料，例如信用卡號碼。
              </p>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleToLogin}
              >
                今天開始開設課程
              </button>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2023 Wilson Ren
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
