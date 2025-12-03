import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi fetch danh sách:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="homepage">
        <div className="app-container">
          <h2 className="app-title">DANH SÁCH HỌC SINH</h2>

          <div className="table-wrapper">
            {loading ? (
              <p className="status-text">Đang tải dữ liệu...</p>
            ) : students.length === 0 ? (
              <p className="status-text empty">Chưa có học sinh nào</p>
            ) : (
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Họ tên</th>
                    <th>Tuổi</th>
                    <th>Lớp</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.class}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
