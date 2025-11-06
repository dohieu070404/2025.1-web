import React from "react";
import "./intropage.css";

const Intropage = () => {
  return (
    <div className="intro-wrapper">

      <section className="intro-hero">
        <div className="intro-hero-content">
          <h1>Về Hiếu Coffee</h1>
          <p>
            Nơi hương vị cà phê gặp gỡ cảm xúc — mang đến cho bạn không gian
            yên bình, ấm áp và đậm chất Việt.
          </p>
        </div>
      </section>

  
      <section className="intro-story">
        <div className="intro-container">
          <h2>Câu chuyện của chúng tôi</h2>
          <p>
            Bắt đầu từ niềm đam mê với hạt cà phê Việt Nam, Hiếu Coffee được
            thành lập với mong muốn mang đến trải nghiệm chân thật nhất cho
            người yêu cà phê. Mỗi tách cà phê đều được rang xay tỉ mỉ, giữ trọn
            hương vị nguyên bản và tinh túy nhất.
          </p>
          <p>
            Không chỉ là đồ uống, cà phê là cầu nối của con người, là khoảnh
            khắc sẻ chia, là phút giây thư giãn giữa bộn bề cuộc sống.
          </p>
        </div>
      </section>

  
      <section className="intro-values">
        <div className="intro-container values-grid">
          <div className="value-card">
            <img src="/assets/beans.jpg" alt="Chất lượng" />
            <h3>Chất lượng hàng đầu</h3>
            <p>
              Từng hạt cà phê được tuyển chọn từ vùng cao nguyên Việt Nam, đảm
              bảo chất lượng và hương vị tự nhiên.
            </p>
          </div>

          <div className="value-card">
            <img src="/assets/barista.jpg" alt="Đam mê" />
            <h3>Đam mê & Tận tâm</h3>
            <p>
              Đội ngũ barista của chúng tôi được đào tạo chuyên nghiệp, đặt
              trọn tâm huyết vào từng ly cà phê.
            </p>
          </div>

          <div className="value-card">
            <img src="/assets/cafe-space.jpg" alt="Không gian" />
            <h3>Không gian thư giãn</h3>
            <p>
              Một nơi để bạn dừng chân, thưởng thức cà phê, và để tâm hồn được
              nghỉ ngơi giữa nhịp sống hiện đại.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Intropage;
