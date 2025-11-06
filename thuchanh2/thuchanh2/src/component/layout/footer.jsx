import './footer.css';
import '../../styles/icondesign.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-left">
            <h4 className="footer-title">TheCoff</h4>
            <p className="footer-subtitle">Kết nối với chúng tôi</p>
            <div className="footer-socials">
              <a href="#" className="footer-icon fb" title="Facebook">
                <span className="streamline-logos--facebook-logo-2-block" />
              </a>
              <a href="#" className="footer-icon yt" title="YouTube">
                <span className="streamline-logos--youtube-clip-logo-block" />
              </a>
              <a href="#" className="footer-icon tk" title="TikTok">
                <span className="streamline-logos--tiktok-logo-block" />
              </a>
              <a href="#" className="footer-icon ig" title="Instagram">
                <span className="streamline-logos--instagram-logo-2-solid" />
              </a>
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-link-group">
              <span className="footer-link-title">Liên kết nhanh</span>
              <ul>
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Menu đồ uống</a></li>
                <li><a href="#">Không gian quán</a></li>
                <li><a href="#">Liên hệ</a></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="footer-separator" />

        <div className="footer-bottom">
          <p>© 2025 Hiếu Coffee — Thiết kế & phát triển bởi Đỗ Hiếu</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
