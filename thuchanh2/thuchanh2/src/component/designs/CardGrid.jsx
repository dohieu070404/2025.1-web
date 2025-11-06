import React from "react";
import "./CardGrid.css";

const CardGrid = ({ cards }) => {
  return (
    <section className="cards-wrapper">
      {cards.map((card, index) => (
        <a
          className="card"
          href={card.link}
          style={{ "--bg-img": `url(${card.bgImg})` }}
          key={index}
        >
          <div className="card-content">
            <h1>{card.title}</h1>
            <p>{card.description}</p>
            <div className="tags">
              {card.tags.map((tag, i) => (
                <div key={i} className="tag">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </a>
      ))}
    </section>
  );
};

export default CardGrid;
