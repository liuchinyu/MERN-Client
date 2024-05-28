import axios from "axios";
// const API_URL = "https://mern-server-y7sc.onrender.com/api/courses";
const API_URL = "http://localhost:8080/api/courses";

class CourseService {
  post(title, description, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { title, description, price }, //驗證的資料
      {
        headers: {
          Authorization: token, //header搭配JWT
        },
      }
    );
  }
  //利用學生id查詢資料
  getEnrollCourses(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/student/" + _id, {
      headers: { Authorization: token },
    });
  }

  //利用講師id查詢資料
  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/instructor/" + _id, {
      headers: { Authorization: token },
    });
  }
  //透過課程ID查詢該堂修課學生
  getStudentByCourse(_id) {
    console.log("test11");
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/foundStudent/" + _id, {
      headers: { Authorization: token },
    });
  }

  getCourseByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/findByName/" + name, {
      headers: { Authorization: token },
    });
  }

  enroll(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/enroll/" + _id,
      {}, //驗證資料空白要使用空陣列
      {
        headers: { Authorization: token },
      }
    );
  }
}
export default new CourseService();
