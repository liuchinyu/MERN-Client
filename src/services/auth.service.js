import axios from "axios";
const API_URL = "https://mern-server-y7sc.onrender.com/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user"); //將user的storage刪除即可
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      //發送post請求到後端 會return一個Promise物件
      username,
      email,
      password,
      role,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user")); //解析JSON物件
  }
}

export default new AuthService(); //建立新物件
