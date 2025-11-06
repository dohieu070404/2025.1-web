import React from "react";
import "./Dashboard.css";

const currency = n => n.toLocaleString() + "đ";

const Dashboard = ({ staffs, complaints, menu }) => {
  const staffActive = staffs.filter(s=>s.status==="active").length;
  const complaintNew = complaints.filter(c=>c.status==="new").length;
  const recent = [...complaints].sort((a,b)=>b.createdAt-a.createdAt).slice(0,5);

  return (
    <div className="dashboard-wrap">
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h4>Nhân viên</h4>
          <p className="dashboard-big">{staffs.length} ({staffActive} active)</p>
        </div>
        <div className="dashboard-card">
          <h4>Khiếu nại mới</h4>
          <p className="dashboard-big">{complaintNew}</p>
        </div>
        <div className="dashboard-card">
          <h4>Món trong menu</h4>
          <p className="dashboard-big">{menu.length}</p>
        </div>
        <div className="dashboard-card">
          <h4>Doanh thu (demo)</h4>
          <p className="dashboard-big">{currency(0)}</p>
        </div>
      </div>

      <div className="dashboard-recent">
        <h3>Khiếu nại gần đây</h3>
        <table className="dashboard-table">
          <thead>
            <tr><th>Mã</th><th>Khách hàng</th><th>Điện thoại</th><th>Nội dung</th><th>Trạng thái</th></tr>
          </thead>
          <tbody>
            {recent.map(c=>(
              <tr key={c.id}>
                <td>#{c.id}</td>
                <td>{c.customerName}</td>
                <td>{c.phone}</td>
                <td>{c.content}</td>
                <td className={`dashboard-status dashboard-${c.status}`}>{c.status.replace("_"," ")}</td>
              </tr>
            ))}
            {recent.length===0 && <tr><td colSpan={5}>Không có dữ liệu.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
