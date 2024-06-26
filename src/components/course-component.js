import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";
import StudentComponent from "./student-component";

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const handelTakeToLogin = () => {
    navigate("/login");
  };

  const handleStudentsFound = async (e) => {
    let result = await CourseService.getStudentByCourse(e.target.id);
    navigate("/StudentComponent", { state: { data: result.data + "," } }); //透過state搭配navigate傳遞資料
  };

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CourseService.get(_id)
          .then((data) => {
            //透過course.service.js連接到course-route.js，取得資料如下圖
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        CourseService.getEnrollCourses(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []); //空陣列表一進入此route就執行function
  console.log("currentUser", currentUser);
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能看到課程</p>
          <button
            className="btn btn-primary btn-lh"
            onClick={handelTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>歡迎來到學生課程頁面</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>歡迎來到講師的課程頁面</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => {
            return (
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">課程名稱:{course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數:{course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格:{course.price}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程講師:{course.instructor.username}
                  </p>
                  {currentUser && currentUser.user.role == "instructor" && (
                    <a
                      href="#"
                      id={course._id}
                      className="card-text btn btn-primary"
                      onClick={handleStudentsFound}
                    >
                      查詢修課學生
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
