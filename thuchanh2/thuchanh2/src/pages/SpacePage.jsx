import React from "react";
import "./spacepage.css";

const images = [
  "/assets/coffee1.jpg",
  "/assets/coffee2.jpg",
  "/assets/coffee3.jpg",
  "/assets/coffee4.jpg",
];

const SpacePage = () => {
  return (
    <div className="space-wrapper">
      <section className="space-hero">
        <div className="space-hero-content">
          <h1>Không gian quán</h1>
          <p>
            Hiếu Coffee mang phong cách mộc mạc, ấm cúng và tinh tế — 
            là nơi bạn có thể thư giãn, làm việc hay trò chuyện cùng bạn bè trong hương thơm cà phê dịu nhẹ.
          </p>
        </div>
      </section>

      <section className="space-gallery-section">
        <div className="space-intro">
          <h2>Không gian của cảm xúc</h2>
          <p>
            Mỗi góc nhỏ trong quán đều được thiết kế với sự chăm chút, 
            mang lại trải nghiệm yên bình, thân thiện và gần gũi với thiên nhiên.
          </p>
        </div>

        <div className="space-gallery">
          {images.map((img, index) => (
            <div key={index} className="space-card">
              <img src={img} alt={`coffee-space-${index}`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SpacePage;
