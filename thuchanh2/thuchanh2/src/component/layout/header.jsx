import React, { useEffect, useState } from "react";
import { CustomDropdown } from "../designs/customdropdown.jsx";
import "./header.css";
import "../../styles/icondesign.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={`header-icon ${scrolled ? "scrolled" : ""}`}>
      <div className="header-logo-group">
        <Link to="/" className="header-logo-link">
          <img src="/assets/logo.jpg" alt="Coffee Logo" className="header-logo" />
          <span className="header-logo-text">The Coff</span>
        </Link>
      </div>
      <nav className={`header-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/Intropage" className="header-btn">Về chúng tôi</Link>
          </li>
          <li>
            <Link to="/menu" className="header-btn">Menu đồ uống</Link>
          </li>
          <li>
            <Link to="/space" className="header-btn">Không gian quán</Link>
          </li>
          <li>
            <Link to="/contact" className="header-btn">Liên hệ</Link>
          </li>
        </ul>
      </nav>
      <div className="header-user">
        <CustomDropdown
          label={<span className="icon-user-account header-user-icon" />}
          items={["login", "register","Admin"]}
        />
      </div>

      <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span></span><span></span><span></span>
      </div>
    </header>
  );
};

export default Header;
