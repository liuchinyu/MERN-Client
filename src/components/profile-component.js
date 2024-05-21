import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  // let [currentUser, setCurrentUser] = useState(null);
  //因在nav bar也需要判斷User，透過state lifting將此移到App.js

  // useEffect(() => { 將判斷透過state lifting，且如果在useEffect裡面使用setState會不斷渲染占用資源
  //   setCurrentUser(AuthService.getCurrentUser());
  // });

  return (
    <div style={{ padding: "3rem" }}>
      {/* 透過state lifting取得CurrentUser */}
      {!currentUser && <div>在獲取您的個人資料之前，您必須先登錄。</div>}
      {currentUser && (
        <div>
          <h2>以下是您的個人檔案：</h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>姓名：{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的用戶ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您註冊的電子信箱: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>身份: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
