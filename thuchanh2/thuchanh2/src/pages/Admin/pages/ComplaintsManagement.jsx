import React, { useMemo, useState } from "react";
import "./ComplaintsManagement.css";

const STATUS_LABEL = {
  new: "mới",
  in_progress: "đang xử lý",
  resolved: "đã xử lý",
};

const labelOf = (key) => STATUS_LABEL[key] || key;

const ComplaintsManagement = ({ data, onCreate, onUpdate, onDelete }) => {
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ customerName: "", phone: "", content: "", status: "new" });
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return data;
    return data.filter((c) => {
      const statusVN = labelOf(c.status).toLowerCase();
      return (
        c.customerName.toLowerCase().includes(t) ||
        c.phone.toLowerCase().includes(t) ||
        statusVN.includes(t) ||
        c.content.toLowerCase().includes(t)
      );
    });
  }, [data, q]);

  const openAdd = () => {
    setEditing(null);
    setForm({ customerName: "", phone: "", content: "", status: "new" });
    setShowForm(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm(c);
    setShowForm(true);
  };

  const submit = (e) => {
    e.preventDefault();
    if (editing) onUpdate(form);
    else onCreate(form);
    setShowForm(false);
  };

  return (
    <div className="complaints-wrap">
      <div className="complaints-toolbar">
        <input
          className="complaints-search"
          placeholder="Tìm theo tên/điện thoại/trạng thái/nội dung..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="complaints-addBtn" onClick={openAdd}>
          + Thêm khiếu nại
        </button>
      </div>

      <div className="complaints-card">
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Mã</th>
              <th>Khách hàng</th>
              <th>Điện thoại</th>
              <th>Nội dung</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>#{c.id}</td>
                <td>{c.customerName}</td>
                <td>{c.phone}</td>
                <td>{c.content}</td>
                <td className="complaints-cap">{labelOf(c.status)}</td>
                <td className="complaints-actions">
                  <button className="complaints-btn complaints-btnMuted" onClick={() => openEdit(c)}>
                    Sửa
                  </button>
                  <button className="complaints-btn complaints-btnDanger" onClick={() => setConfirmDelete(c)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6}>Không có dữ liệu.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="complaints-overlay">
          <div className="complaints-modal">
            <h3>{editing ? "Cập nhật khiếu nại" : "Thêm khiếu nại"}</h3>
            <form onSubmit={submit}>
              <input
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                placeholder="Tên khách hàng"
                required
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Số điện thoại"
                required
              />
              <textarea
                rows={4}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Nội dung"
              />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="new">Mới</option>
                <option value="in_progress">Đang xử lý</option>
                <option value="resolved">Đã xử lý</option>
              </select>
              <div className="complaints-actionsRow">
                <button type="submit" className="complaints-btn complaints-btnPrimary">
                  {editing ? "Lưu" : "Thêm"}
                </button>
                <button type="button" className="complaints-btn complaints-btnMuted" onClick={() => setShowForm(false)}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="complaints-overlay">
          <div className="complaints-modal">
            <h3>Xác nhận xóa</h3>
            <p>Bạn có chắc muốn xóa khiếu nại #{confirmDelete.id}?</p>
            <div className="complaints-actionsRow">
              <button
                className="complaints-btn complaints-btnDanger"
                onClick={() => {
                  onDelete(confirmDelete.id);
                  setConfirmDelete(null);
                }}
              >
                Xóa
              </button>
              <button className="complaints-btn complaints-btnMuted" onClick={() => setConfirmDelete(null)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsManagement;
