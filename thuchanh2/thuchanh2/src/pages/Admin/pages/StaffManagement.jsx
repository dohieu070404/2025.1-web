import React, { useMemo, useState } from "react";
import "./StaffManagement.css";

const StaffManagement = ({ data, onCreate, onUpdate, onDelete }) => {
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name:"", email:"", role:"barista", status:"active" });
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = useMemo(()=>{
    const t=q.trim().toLowerCase();
    if(!t) return data;
    return data.filter(s =>
      s.name.toLowerCase().includes(t) ||
      s.email.toLowerCase().includes(t) ||
      s.role.toLowerCase().includes(t) ||
      s.status.toLowerCase().includes(t)
    );
  },[data,q]);

  const openAdd = ()=>{ setEditing(null); setForm({ name:"", email:"", role:"barista", status:"active" }); setShowForm(true); };
  const openEdit = (s)=>{ setEditing(s); setForm(s); setShowForm(true); };

  const submit = (e)=>{
    e.preventDefault();
    if(editing) onUpdate(form); else onCreate(form);
    setShowForm(false);
  };

  return (
    <div className="staff-wrap">
      <div className="staff-toolbar">
        <input className="staff-search" placeholder="Tìm theo tên/email/role/trạng thái..."
               value={q} onChange={(e)=>setQ(e.target.value)}/>
        <button className="staff-addBtn" onClick={openAdd}>+ Thêm nhân viên</button>
      </div>

      <div className="staff-card">
        <table className="staff-table">
          <thead><tr><th>Tên</th><th>Email</th><th>Vai trò</th><th>Trạng thái</th><th></th></tr></thead>
          <tbody>
            {filtered.map(s=>(
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td className="staff-cap">{s.role}</td>
                <td className="staff-cap">{s.status}</td>
                <td className="staff-actions">
                  <button className="staff-btn staff-btnMuted" onClick={()=>openEdit(s)}>Sửa</button>
                  <button className="staff-btn staff-btnDanger" onClick={()=>setConfirmDelete(s)}>Xóa</button>
                </td>
              </tr>
            ))}
            {filtered.length===0 && <tr><td colSpan={5}>Không có dữ liệu.</td></tr>}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="staff-overlay">
          <div className="staff-modal">
            <h3>{editing?"Cập nhật nhân viên":"Thêm nhân viên"}</h3>
            <form onSubmit={submit}>
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Họ và tên" required/>
              <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" required/>
              <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
                <option value="barista">barista</option>
                <option value="cashier">cashier</option>
                <option value="manager">manager</option>
              </select>
              <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
              <div className="staff-actionsRow">
                <button type="submit" className="staff-btn staff-btnPrimary">{editing?"Lưu":"Thêm"}</button>
                <button type="button" className="staff-btn staff-btnMuted" onClick={()=>setShowForm(false)}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="staff-overlay">
          <div className="staff-modal">
            <h3>Xác nhận xóa</h3>
            <p>Bạn có chắc muốn xóa tài khoản “{confirmDelete.name}”?</p>
            <div className="staff-actionsRow">
              <button className="staff-btn staff-btnDanger" onClick={()=>{onDelete(confirmDelete.id); setConfirmDelete(null);}}>Xóa</button>
              <button className="staff-btn staff-btnMuted" onClick={()=>setConfirmDelete(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
