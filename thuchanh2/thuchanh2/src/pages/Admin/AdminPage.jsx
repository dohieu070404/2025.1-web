
import React, { useEffect, useState } from "react";
import "./AdminPage.css";

import Dashboard from "./pages/Dashboard.jsx";
import StaffManagement from "./pages/StaffManagement.jsx";
import ComplaintsManagement from "./pages/ComplaintsManagement.jsx";
import MenuManagement from "./pages/MenuManagement.jsx";

const AdminPage = () => {
    const [active, setActive] = useState("dashboard");

  const [staffs, setStaffs] = useState([
    { id: 1, name: "Nguyễn An", email: "an@hieu.coffee", role: "barista", status: "active" },
    { id: 2, name: "Trần Bình", email: "binh@hieu.coffee", role: "cashier", status: "inactive" },
  ]);

  const [complaints, setComplaints] = useState([
    { id: 1001, customerName: "Lan", phone: "0909000111", content: "Đồ uống bị trễ.", status: "new", createdAt: Date.now() - 3600_000 },
    { id: 1002, customerName: "Minh", phone: "0909888777", content: "Pha sai món.", status: "in_progress", createdAt: Date.now() - 7200_000 },
  ]);

  const [menu, setMenu] = useState([
    { id: 11, name: "Cà phê đen đá", price: 30000, image: "/assets/coffee2.jpg", category: "Coffee" },
    { id: 12, name: "Cà phê sữa đá", price: 35000, image: "/assets/coffee2.jpg", category: "Coffee" },
    { id: 13, name: "Bạc xỉu",       price: 40000, image: "/assets/coffee2.jpg",      category: "Coffee" },
    { id: 14, name: "Latte",          price: 45000, image: "/assets/coffee2.jpg",       category: "Espresso" },
  ]);

  useEffect(() => {
    const s = localStorage.getItem("admin.staffs");
    const c = localStorage.getItem("admin.complaints");
    const m = localStorage.getItem("admin.menu");
    if (s) setStaffs(JSON.parse(s));
    if (c) setComplaints(JSON.parse(c));
    if (m) setMenu(JSON.parse(m));
  }, []);
  useEffect(() => localStorage.setItem("admin.staffs", JSON.stringify(staffs)), [staffs]);
  useEffect(() => localStorage.setItem("admin.complaints", JSON.stringify(complaints)), [complaints]);
  useEffect(() => localStorage.setItem("admin.menu", JSON.stringify(menu)), [menu]);

  const createStaff = (data) => setStaffs(prev => [...prev, { ...data, id: Date.now() }]);
  const updateStaff = (data) => setStaffs(prev => prev.map(s => s.id === data.id ? data : s));
  const deleteStaff = (id) => setStaffs(prev => prev.filter(s => s.id !== id));

  const createComplaint = (data) => setComplaints(prev => [...prev, { ...data, id: Date.now(), createdAt: Date.now() }]);
  const updateComplaint = (data) => setComplaints(prev => prev.map(c => c.id === data.id ? data : c));
  const deleteComplaint = (id) => setComplaints(prev => prev.filter(c => c.id !== id));

  const createMenu = (data) => setMenu(prev => [...prev, { ...data, id: Date.now() }]);
  const updateMenu = (data) => setMenu(prev => prev.map(m => m.id === data.id ? data : m));
  const deleteMenu = (id) => setMenu(prev => prev.filter(m => m.id !== id));

  const renderPage = () => {
    if (active === "dashboard") return <Dashboard staffs={staffs} complaints={complaints} menu={menu} />;
    if (active === "staffs")
      return <StaffManagement data={staffs} onCreate={createStaff} onUpdate={updateStaff} onDelete={deleteStaff} />;
    if (active === "complaints")
      return <ComplaintsManagement data={complaints} onCreate={createComplaint} onUpdate={updateComplaint} onDelete={deleteComplaint} />;
    if (active === "menu")
      return <MenuManagement data={menu} onCreate={createMenu} onUpdate={updateMenu} onDelete={deleteMenu} />;
    return null;
  };

  return (
    <div className="adminApp-layout">
      <aside className="adminApp-sidebar">
        <div className="adminApp-brand">Hiếu Coffee — Admin</div>
        <nav className="adminApp-nav">
          <ul>
            <li className={active==="dashboard" ? "active" : ""} onClick={()=>setActive("dashboard")}>Dashboard</li>
            <li className={active==="staffs" ? "active" : ""} onClick={()=>setActive("staffs")}>Nhân viên</li>
            <li className={active==="complaints" ? "active" : ""} onClick={()=>setActive("complaints")}>Khiếu nại</li>
            <li className={active==="menu" ? "active" : ""} onClick={()=>setActive("menu")}>Menu</li>
          </ul>
        </nav>
      </aside>

      <main className="adminApp-main">
        <header className="adminApp-header">
          <h2>Bảng điều khiển quản trị</h2>
        </header>
        <section className="adminApp-content">{renderPage()}</section>
      </main>
    </div>
  );
};

export default AdminPage;
