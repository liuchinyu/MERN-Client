import { useLocation } from "react-router-dom";
import "../style/style.css";

const StudentComponent = () => {
  const location = useLocation();
  const { data } = location.state || {}; // 解構state對象的data屬性
  let newData = data.slice(0, -1);
  let result = newData.split(",");
  return (
    <div>
      <h1>Student Data</h1>
      <table>
        <tr>
          <th>學生姓名</th>
        </tr>
        {newData.split(",").map((char) => (
          <tr>
            <td>{char}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default StudentComponent;
