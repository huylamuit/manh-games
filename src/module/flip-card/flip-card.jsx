import { useState, useEffect } from "react";
import "./flip-card.css";

// Danh sách ảnh, mỗi ảnh xuất hiện 2 lần
const initialCards = [
  { id: 1, img:`${process.env.PUBLIC_URL}/img/flip-card/manh1.jpg` },
  { id: 2, img:`${process.env.PUBLIC_URL}/img/flip-card/manh2.jpg`},
  { id: 3, img:`${process.env.PUBLIC_URL}/img/flip-card/manh3.jpg` },
  { id: 4, img:`${process.env.PUBLIC_URL}/img/flip-card/manh4.jpg` },
  { id: 5, img:`${process.env.PUBLIC_URL}/img/flip-card/manh5.jpg` },
  { id: 6, img:`${process.env.PUBLIC_URL}/img/flip-card/manh6.jpg` },
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function FlipCard() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const shuffledCards = shuffle([...initialCards, ...initialCards]).map((card, index) => ({
      ...card,
      key: index,
    }));
    setCards(shuffledCards);
  }, []);

  const handleFlip = (index) => {
    if (flipped.length === 2 || matched.includes(index)) return;

    setFlipped([...flipped, index]);

    if (flipped.length === 1) {
      const firstCard = cards[flipped[0]];
      const secondCard = cards[index];

      if (firstCard.img === secondCard.img) {
        setMatched([...matched, flipped[0], index]);
      }

      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="flip-card-game">
      <h2>Lật Mặt 9</h2>
      <div className="board">
        {cards.map((card, index) => (
          <div
            key={card.key}
            className={`card ${flipped.includes(index) || matched.includes(index) ? "flipped" : ""}`}
            onClick={() => handleFlip(index)}
          >
            {flipped.includes(index) || matched.includes(index) ? (
              <img src={card.img} alt="Card" className="card-image" />
            ) : (
              <div className="card-back">❓</div>
            )}
          </div>
        ))}
      </div>
      {matched.length === cards.length && <div><h3>🎉 Chúc mừng manh wa giỏii! 🎉</h3></div>}
    </div>
  );
}

export default FlipCard;
