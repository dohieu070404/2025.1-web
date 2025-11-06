import React, { useState } from "react";
import "./Slideshow.css";

const Slideshow = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="container">
      <div className="slideshow">
        <div className="slide" onClick={nextSlide}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="nav-btn nav-left"
          >
            ◀
          </button>
          <img
            src={slides[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            width={1680}
            height={670}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="nav-btn nav-right"
          >
            ▶
          </button>
        </div>
      </div>

      <div className="pagination">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={index === currentIndex ? "active" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
