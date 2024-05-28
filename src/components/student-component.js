import { useLocation } from "react-router-dom";

const StudentComponent = () => {
  const location = useLocation();
  const { data } = location.state || {}; // 解構state對象的data屬性
  let newData = data.slice(0, -1);
  return (
    <div>
      <h1>Student Data</h1>
      <p>{newData}</p>
    </div>
  );
};

export default StudentComponent;
