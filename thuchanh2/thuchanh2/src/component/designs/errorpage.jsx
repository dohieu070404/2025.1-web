import React from "react";
import { Link, useRouteError } from "react-router-dom";
import "./errorpage.css";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        width="120"
        height="120"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="256" cy="256" r="200" stroke="#c49a6c" fill="none" />
        <line x1="180" y1="180" x2="332" y2="332" stroke="#c49a6c" />
        <line x1="332" y1="180" x2="180" y2="332" stroke="#c49a6c" />
      </svg>

      <h1>Rất tiếc! Có lỗi xảy ra.</h1>
      <p>{error.statusText || error.message}</p>

      <Link to="/" className="error-btn">
        Quay lại trang chủ
      </Link>
    </div>
  );
};

export default ErrorPage;
