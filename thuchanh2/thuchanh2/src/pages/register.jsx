import React, { useState } from "react";
import "./login.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/smarthome/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username,
          password: formData.password,
          email: formData.email,
          dob: formData.dob,
          roles: ["USER"], // đúng kiểu Set<String>
        }),
      });

      const result = await response.json();

      if (result.code === 1000) {
        alert("Đăng ký thành công!");
        window.location.href = "/login";
      } else {
        alert("Đăng ký thất bại: " + result.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Đã xảy ra lỗi hệ thống!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg"></div>

      <main className="form-signin">
        <h1 className="h3">Register</h1>

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
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-floating">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
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

          <div className="form-floating">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check">
            <input type="checkbox" id="termsAgree" required />
            <label htmlFor="termsAgree">
              I agree to the terms and conditions
            </label>
          </div>

          <button type="submit" className="btn">
            Register
          </button>
        </form>
        <div className="form-check">
            <p>Bạn đã có tài khoản?   </p>
            <a href="/login"> Đăng Nhập</a>
          </div>
        <p className="copyright">&copy; 2025 by dohieu</p>
      </main>
    </div>
  );
};

export default RegisterPage;