import React, { useState } from "react";
import "./login.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Data gửi đi:", formData);
      const response = await fetch("http://localhost:8080/smarthome/auth/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: formData.username,
          password: formData.password,
        }),
      });

      const result = await response.json();
      console.log("Kết quả từ backend:", result);

      if (result.code === 0 && result.result?.token) {
        localStorage.setItem("token", result.result.token);
        alert("Đăng nhập thành công!");
        window.location.href = "/ownerpage"; 
      } else {
        alert("Đăng nhập thất bại: Đăng nhập sai hoặc hệ thống lỗi");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      alert("Lỗi hệ thống. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg"></div>

      <main className="form-signin">
        <h1 className="h3">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-floating">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check">
            <input type="checkbox" id="rememberMeSwitch" name="remember_me" />
            <label htmlFor="rememberMeSwitch">Remember me</label>
          </div>
          <div className="form-check">
            <p>chưa có tài khoản? </p>
            <a href="/register"> đăng ký</a>
          </div>

          <button type="submit" className="btn">Sign in</button>
        </form>

        <p className="copyright">&copy; 2025 by Dohieu</p>
      </main>
    </div>
  );
};

export default LoginPage;