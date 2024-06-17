import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(""); //等待數據的情況下使用null較合適
  let [message, setMessage] = useState("");
  let [serch, setSerch] = useState(false); //判斷是否有搜尋過

  useEffect(() => {
    //透過useEffect監控searchResult跟serch
    if (serch && searchResult && searchResult.length === 0) {
      setMessage("查無此課程");
    }
  }, [serch, searchResult]);

  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handelSearch = () => {
    setSerch(true);
    if (message) {
      setMessage(""); //每次輸入都將錯誤資料清空
    }

    CourseService.getCourseByName(searchInput)
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEnroll = (e) => {
    // console.log(e.target._id);
    CourseService.enroll(e.target.id)
      .then(() => {
        window.alert("課程註冊成功!重新導向到課程頁面");
        navigate("/course");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <dvi>
          <p>您必須先登入才能開始註冊課程。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </dvi>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>只有學生才能註冊課程</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={handleChangeInput}
          />
          <button onClick={handelSearch} className="btn btn-primary">
            搜尋課程
          </button>
        </div>
      )}
      {message && <div className="alert alert-danger">{message}</div>}
      {console.log("earchResult.length.", searchResult.length)}

      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <p>這是我們從API取回的數據:</p>
          {searchResult.map((course) => {
            return (
              <div key={course._id} className="card" style={{ width: "18rem" }}>
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
                    講師:{course.instructor.username}
                  </p>
                  <a
                    href="#"
                    id={course._id}
                    className="card-text btn btn-primary"
                    onClick={handleEnroll}
                  >
                    註冊課程
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
