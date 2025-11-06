import React, { useEffect, useState, useRef } from "react";
import "./AdminPage.css";

import Dashboard from "./pages/Dashboard.jsx";
import StaffManagement from "./pages/StaffManagement.jsx";
import ComplaintsManagement from "./pages/ComplaintsManagement.jsx";
import MenuManagement from "./pages/MenuManagement.jsx";

const LS_KEYS = {
  staffs: "admin.staffs",
  complaints: "admin.complaints",
  menu: "admin.menu",
};

const DEMO_STAFFS = [
  { id: 1, name: "Nguyễn An", email: "an@hieu.coffee", role: "barista", status: "active" },
  { id: 2, name: "Trần Bình", email: "binh@hieu.coffee", role: "cashier", status: "inactive" },
];

const DEMO_COMPLAINTS = [
  { id: 1001, customerName: "Lan", phone: "0909000111", content: "Đồ uống bị trễ.", status: "new", createdAt: Date.now() - 3600_000 },
  { id: 1002, customerName: "Minh", phone: "0909888777", content: "Pha sai món.", status: "in_progress", createdAt: Date.now() - 7200_000 },
];

const DEMO_MENU = [
  { id: 11, name: "Cà phê đen đá", price: 30000, image: "/assets/coffee2.jpg", category: "Coffee" },
  { id: 12, name: "Cà phê sữa đá", price: 35000, image: "/assets/coffee2.jpg", category: "Coffee" },
  { id: 13, name: "Bạc xỉu",       price: 40000, image: "/assets/coffee2.jpg", category: "Coffee" },
  { id: 14, name: "Latte",          price: 45000, image: "/assets/coffee2.jpg", category: "Espresso" },
];

const safeLoad = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn("localStorage load fail:", e);
    return fallback;
  }
};

const safeSave = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("localStorage save fail:", e);
  }
};

const AdminPage = () => {
  const [active, setActive] = useState("dashboard");

  // state
  const [staffs, setStaffs] = useState(DEMO_STAFFS);
  const [complaints, setComplaints] = useState(DEMO_COMPLAINTS);
  const [menu, setMenu] = useState(DEMO_MENU);
  const [hydrated, setHydrated] = useState(false);
  const fileRef = useRef(null);


  useEffect(() => {
    setStaffs(safeLoad(LS_KEYS.staffs, DEMO_STAFFS));
    setComplaints(safeLoad(LS_KEYS.complaints, DEMO_COMPLAINTS));
    setMenu(safeLoad(LS_KEYS.menu, DEMO_MENU));
    setHydrated(true);
  }, []);


  useEffect(() => { if (hydrated) safeSave(LS_KEYS.staffs, staffs); }, [staffs, hydrated]);
  useEffect(() => { if (hydrated) safeSave(LS_KEYS.complaints, complaints); }, [complaints, hydrated]);
  useEffect(() => { if (hydrated) safeSave(LS_KEYS.menu, menu); }, [menu, hydrated]);

  // CRUD
  const createStaff = (d) => setStaffs(prev => [...prev, { ...d, id: Date.now() }]);
  const updateStaff = (d) => setStaffs(prev => prev.map(s => s.id === d.id ? d : s));
  const deleteStaff = (id) => setStaffs(prev => prev.filter(s => s.id !== id));

  const createComplaint = (d) => setComplaints(prev => [...prev, { ...d, id: Date.now(), createdAt: Date.now() }]);
  const updateComplaint = (d) => setComplaints(prev => prev.map(c => c.id === d.id ? d : c));
  const deleteComplaint = (id) => setComplaints(prev => prev.filter(c => c.id !== id));

  const createMenu = (d) => setMenu(prev => [...prev, { ...d, id: Date.now() }]);
  const updateMenu = (d) => setMenu(prev => prev.map(m => m.id === d.id ? d : m));
  const deleteMenu = (id) => setMenu(prev => prev.filter(m => m.id !== id));

  // export / import / reset demo
  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ staffs, complaints, menu }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hieu-coffee-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file) => {
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      if (Array.isArray(json.staffs)) setStaffs(json.staffs);
      if (Array.isArray(json.complaints)) setComplaints(json.complaints);
      if (Array.isArray(json.menu)) setMenu(json.menu);
    } catch (e) {
      console.error("Import JSON lỗi:", e);
    }
  };

  const handleResetDemo = () => {
    setStaffs(DEMO_STAFFS);
    setComplaints(DEMO_COMPLAINTS);
    setMenu(DEMO_MENU);
  };

  const renderPage = () => {
    if (active === "dashboard") return <Dashboard staffs={staffs} complaints={complaints} menu={menu} />;
    if (active === "staffs") return <StaffManagement data={staffs} onCreate={createStaff} onUpdate={updateStaff} onDelete={deleteStaff} />;
    if (active === "complaints") return <ComplaintsManagement data={complaints} onCreate={createComplaint} onUpdate={updateComplaint} onDelete={deleteComplaint} />;
    if (active === "menu") return <MenuManagement data={menu} onCreate={createMenu} onUpdate={updateMenu} onDelete={deleteMenu} />;
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
          <div className="adminApp-tools">
            <button className="adminApp-btn primary" onClick={handleExport}>Xuất JSON</button>
            <button className="adminApp-btn muted" onClick={() => document.getElementById("admin-import").click()}>Nhập JSON</button>
            <button className="adminApp-btn danger" onClick={handleResetDemo}>Reset demo</button>
            <input
              id="admin-import"
              type="file"
              accept="application/json"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImport(f);
                e.target.value = "";
              }}
            />
          </div>
        </header>
        <section className="adminApp-content">{renderPage()}</section>
      </main>
    </div>
  );
};

export default AdminPage;
