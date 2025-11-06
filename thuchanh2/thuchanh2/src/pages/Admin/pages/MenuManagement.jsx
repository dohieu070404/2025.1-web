import React, { useMemo, useState } from "react";
import "./MenuManagement.css";

const format = n => n.toLocaleString()+"đ";

const MenuManagement = ({ data, onCreate, onUpdate, onDelete }) => {
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name:"", price:0, image:"", category:"" });
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = useMemo(()=>{
    const t=q.trim().toLowerCase();
    if(!t) return data;
    return data.filter(m =>
      m.name.toLowerCase().includes(t) || (m.category||"").toLowerCase().includes(t)
    );
  },[data,q]);

  const openAdd = ()=>{ setEditing(null); setForm({ name:"", price:0, image:"", category:"" }); setShowForm(true); };
  const openEdit = (m)=>{ setEditing(m); setForm(m); setShowForm(true); };

  const submit = (e)=>{
    e.preventDefault();
    const price = Number(form.price);
    if(!form.name || isNaN(price) || price<0) return;
    if(editing) onUpdate({...form, price});
    else onCreate({...form, price});
    setShowForm(false);
  };

  return (
    <div className="menuMng-wrap">
      <div className="menuMng-toolbar">
        <input className="menuMng-search" placeholder="Tìm theo tên/nhóm..."
               value={q} onChange={(e)=>setQ(e.target.value)}/>
        <button className="menuMng-addBtn" onClick={openAdd}>+ Thêm món</button>
      </div>

      <div className="menuMng-grid">
        {filtered.map(m=>(
          <div key={m.id} className="menuMng-card">
            <img src={m.image} alt={m.name}/>
            <div className="menuMng-meta">
              <h4>{m.name}</h4>
              <p className="menuMng-cat">{m.category||"Khác"}</p>
              <p className="menuMng-price">{format(m.price)}</p>
            </div>
            <div className="menuMng-actions">
              <button className="menuMng-btn menuMng-btnMuted" onClick={()=>openEdit(m)}>Sửa</button>
              <button className="menuMng-btn menuMng-btnDanger" onClick={()=>setConfirmDelete(m)}>Xóa</button>
            </div>
          </div>
        ))}
        {filtered.length===0 && <div className="menuMng-empty">Không có dữ liệu.</div>}
      </div>

      {showForm && (
        <div className="menuMng-overlay">
          <div className="menuMng-modal">
            <h3>{editing?"Cập nhật món":"Thêm món mới"}</h3>
            <form onSubmit={submit}>
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Tên món" required/>
              <input type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="Giá (VND)" required/>
              <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="Nhóm (Coffee/Trà/...)" />
              <input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder="Ảnh (/assets/...)" />
              <div className="menuMng-actionsRow">
                <button type="submit" className="menuMng-btn menuMng-btnPrimary">{editing?"Lưu":"Thêm"}</button>
                <button type="button" className="menuMng-btn menuMng-btnMuted" onClick={()=>setShowForm(false)}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="menuMng-overlay">
          <div className="menuMng-modal">
            <h3>Xác nhận xóa</h3>
            <p>Bạn có chắc muốn xóa món “{confirmDelete.name}”?</p>
            <div className="menuMng-actionsRow">
              <button className="menuMng-btn menuMng-btnDanger" onClick={()=>{onDelete(confirmDelete.id); setConfirmDelete(null);}}>Xóa</button>
              <button className="menuMng-btn menuMng-btnMuted" onClick={()=>setConfirmDelete(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
