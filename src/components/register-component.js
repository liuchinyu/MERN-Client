import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //重新導向
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, serPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");

  const handelUsername = (e) => {
    setUsername(e.target.value);
  };
  const handelPassword = (e) => {
    serPassword(e.target.value);
  };
  const handelEmail = (e) => {
    setEmail(e.target.value);
  };
  const handelRole = (e) => {
    setRole(e.target.value);
  };

  const handleRegister = (e) => {
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[-_@$!%*?&])[A-Za-z\d-_@$!%*?&]{6,20}$/;
    // 重置错误信息
    setMessage("");
    if (!passwordPattern.test(password)) {
      setMessage("密碼須包含英文字母、數字、及一個特殊符號");
      return;
    }

    if (role !== "student" && role !== "instructor") {
      setMessage("身份只能是student或instructor");
      return;
    }

    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("註冊成功，您即將被導向到登入頁面");
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        <div>
          {message && <div className="alert alert-danger">{message}</div>}{" "}
          {/* 當useState記錄到錯誤訊息後才會顯示 */}
          <label htmlFor="username">用戶名稱:</label>
          <input
            type="text"
            onChange={handelUsername}
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">電子信箱：</label>
          <input
            type="text"
            onChange={handelEmail}
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            type="password"
            onChange={handelPassword}
            className="form-control"
            name="password"
            placeholder="長度至少超過6個英文數字及包含一個特殊符號"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">身份：</label>
          <input
            type="text"
            onChange={handelRole}
            className="form-control"
            placeholder="只能填入student或是instructor這兩個選項其一"
            name="role"
          />
        </div>
        <br />
        <button className="btn btn-primary" onClick={handleRegister}>
          <span>註冊會員</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
