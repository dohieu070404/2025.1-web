import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

function App() {
  const [students, setStudents] = useState([]);

  // Form thêm
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  // Form sửa 
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editClass, setEditClass] = useState("");

  // Tìm kiếm + sắp xếp
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  // Fetch danh sách
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Thêm học sinh
  const handleAddStudent = (e) => {
    e.preventDefault();

    const newStu = { name, age: Number(age), class: stuClass };

    axios
      .post("http://localhost:5000/api/students", newStu)
      .then((res) => {
        setStudents((prev) => [...prev, res.data]);
        setName("");
        setAge("");
        setStuClass("");
        showToast("Đã thêm học sinh!", "success");
      })
      .catch((err) => console.error("Lỗi thêm:", err));
  };


  const openEditModal = (student) => {
    setEditId(student._id);
    setEditName(student.name);
    setEditAge(student.age);
    setEditClass(student.class);
    setIsEditOpen(true);
  };

  // Submit sửa
  const handleUpdateStudent = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/students/${editId}`, {
        name: editName,
        age: Number(editAge),
        class: editClass,
      })
      .then((res) => {
        setStudents((prev) =>
          prev.map((s) => (s._id === editId ? res.data : s))
        );
        setIsEditOpen(false);
        showToast("Cập nhật thành công!", "success");
      })
      .catch((err) => console.error("Lỗi cập nhật:", err));
  };

  // Xóa
  const handleDelete = (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;

    axios
      .delete(`http://localhost:5000/api/students/${id}`)
      .then(() => {
        setStudents((prev) => prev.filter((s) => s._id !== id));
        showToast("Đã xóa!", "delete");
      })
      .catch((err) => console.error("Lỗi xóa:", err));
  };

  // Tìm kiếm
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp
  const splitName = (fullName) => {
    if (!fullName) return { last: "", mid: "", first: "" };

    const parts = fullName.trim().split(/\s+/);

    return {
      first: parts[0],
      last: parts[parts.length - 1],
      mid: parts.slice(1, -1).join(" "),
    };
  };

  const compareVietnameseNames = (a, b, asc = true) => {
    const nameA = splitName(a);
    const nameB = splitName(b);

    const order = asc ? 1 : -1;

    const lastCompare = nameA.last.localeCompare(nameB.last, "vi", { sensitivity: "base" });
    if (lastCompare !== 0) return lastCompare * order;

    const midCompare = nameA.mid.localeCompare(nameB.mid, "vi", { sensitivity: "base" });
    if (midCompare !== 0) return midCompare * order;

    const firstCompare = nameA.first.localeCompare(nameB.first, "vi", { sensitivity: "base" });
    return firstCompare * order;
  };

  const sorted = [...filtered].sort((a, b) =>
    compareVietnameseNames(a.name, b.name, sortAsc)
  );



  return (
    <>
      <Header />
      <div className="container">
        <h2>Danh sách học sinh</h2>

        <form onSubmit={handleAddStudent} className="add-form">
          <input
            placeholder="Họ tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Tuổi"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <input
            placeholder="Lớp"
            value={stuClass}
            onChange={(e) => setStuClass(e.target.value)}
            required
          />
          <button type="submit">Thêm học sinh</button>
        </form>

        <input
          className="search-input"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={() => setSortAsc((p) => !p)}>
          Sắp xếp: {sortAsc ? "A → Z" : "Z → A"}
        </button>

        <table>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Tuổi</th>
              <th>Lớp</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {sorted.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.age}</td>
                <td>{s.class}</td>
                <td>
                  <button onClick={() => openEditModal(s)}>Sửa</button>
                  <button onClick={() => handleDelete(s._id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isEditOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Chỉnh sửa học sinh</h3>

              <form onSubmit={handleUpdateStudent}>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  type="number"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                />
                <input
                  value={editClass}
                  onChange={(e) => setEditClass(e.target.value)}
                />

                <button type="submit">Lưu thay đổi</button>
                <button type="button" onClick={() => setIsEditOpen(false)}>
                  Hủy
                </button>
              </form>
            </div>
          </div>
        )}

        {toast && (
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
