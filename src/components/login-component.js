import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handelEmail = (e) => {
    setEmail(e.target.value);
  };
  const handelPassword = (e) => {
    setPassword(e.target.value);
  };

  const handelLogin = async () => {
    try {
      let response = await AuthService.login(email, password); //Login會有JWT(Server的auth.js裡面的Login Route)
      localStorage.setItem("user", JSON.stringify(response.data));
      //setItem:儲存key跟value，一般只能存取String，故須透過JSON.stringify，才可存取其他type的資料
      window.alert("登入成功，您將會被導向到個人頁面");
      setCurrentUser(AuthService.getCurrentUser()); //登入時就給定user
      navigate("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {message && <div className="alert alert-danger">{message}</div>}
      <div>
        <div className="form-group">
          <label htmlFor="username">電子信箱：</label>
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
          />
        </div>
        <br />
        <div className="form-group">
          <button className="btn btn-primary btn-block" onClick={handelLogin}>
            <span>登入系統</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
