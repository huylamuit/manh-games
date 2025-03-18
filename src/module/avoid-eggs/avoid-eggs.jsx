import React, { useState, useEffect } from "react";
import "./avoid-eggs.css";

function AvoidEggs() {
  const [characterX, setCharacterX] = useState(100);
  const [characterY, setCharacterY] = useState(50);
  const [eggs, setEggs] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [eggSpeed, setEggSpeed] = useState(5);

  const moveCharacter = (e) => {
    if (gameOver) return;

    if (e.key === "ArrowLeft") {
      setCharacterX((prev) => Math.max(prev - 20, 0));
    } else if (e.key === "ArrowRight") {
      setCharacterX((prev) => Math.min(prev + 20, 380));
    }
  };

  const createEgg = () => {
    const newEgg = {
      id: Date.now(),
      x: Math.floor(Math.random() * 380),
      y: 380,
    };
    setEggs((prevEggs) => [...prevEggs, newEgg]);
  };

  const moveEggs = () => {
    setEggs((prevEggs) => {
      return prevEggs
        .map((egg) => ({ ...egg, y: egg.y - eggSpeed }))
        .filter((egg) => egg.y >= 0);
    });
  };

  const checkCollision = () => {
    eggs.forEach((egg) => {
      const eggWidth = 15;
      const eggHeight = 15;
      const characterWidth = 64;
      const characterHeight = 64;

      if (
        egg.x < characterX + characterWidth &&
        egg.x + eggWidth > characterX &&
        egg.y < characterY + characterHeight &&
        egg.y + eggHeight > characterY
      ) {
        setEggs((prevEggs) => prevEggs.filter((egg) => egg.id !== egg.id));
        setGameOver(true);
      }

      if (egg.y === 50) {
        updateScore();
      }
    });
  };

  const updateScore = () => {
    setScore((prevScore) => {
      const newScore = prevScore + 10;
      return newScore;
    });
  };

  const updateSpeed = () => {
    if (score % 100 === 0 && score > 0) {
      let tempSpeed = eggSpeed;
      setEggSpeed(tempSpeed + 1);
    }
  };

  const restartGame = () => {
    setCharacterX(100);
    setCharacterY(50);
    setEggs([]);
    setScore(0);
    setEggSpeed(5);
    setGameOver(false);
  };

  useEffect(() => {
    const intervalEgg = setInterval(createEgg, 800);
    return () => clearInterval(intervalEgg);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!gameOver) {
        moveEggs();
        checkCollision();
        updateSpeed();
      }
    }, 50);

    return () => clearInterval(moveInterval);
  }, [eggs, gameOver, score, eggSpeed]);

  useEffect(() => {
    const handleKeydown = (e) => moveCharacter(e);
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [gameOver]);

  return (
    <div className="avoid-eggs-game">
      <div className="game-area">
        {!gameOver ? (
          <>
            <div
              className="character"
              style={{
                left: `${characterX}px`,
                bottom: `${characterY}px`,
              }}
            ></div>
            {eggs.map((egg) => (
              <div
                key={egg.id}
                className="egg"
                style={{
                  left: `${egg.x}px`,
                  bottom: `${egg.y}px`,
                }}
              ></div>
            ))}
            <div className="score">Điểm: {score}</div>
          </>
        ) : (
          <div className="game-over">
            Điểm của em manh là: {score}
            <div>
            <button onClick={restartGame}>Chơi lại</button>
            </div>
              
          </div>
        )}
        <div className="game-ground"></div>
      </div>
    </div>
  );
}

export default AvoidEggs;
