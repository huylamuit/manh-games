import React, { useState, useEffect } from "react";
import "./truth-or-dare.css";
import data from "./data.json";

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function TruthOrDare() {
  const [truthList, setTruthList] = useState([]);
  const [dareList, setDareList] = useState([]);
  const [currentCard, setCurrentCard] = useState("");

  useEffect(() => {
    const shuffledTruth = shuffleArray(data.truth);
    const shuffledDare = shuffleArray(data.dare);
    setTruthList(shuffledTruth);
    setDareList(shuffledDare);
  }, []);

  const handleClick = (type) => {
    if (type === "TRUTH" && truthList.length > 0) {
      const [first, ...rest] = truthList;
      setCurrentCard(first.question);
      setTruthList(rest);
    } else if (type === "DARE" && dareList.length > 0) {
      const [first, ...rest] = dareList;
      setCurrentCard(first.challenge);
      setDareList(rest);
    }
  };

  return (
    <div>
        <div className="title">
            <h1>Truth Or Dare</h1>
        </div>
        <div className="card">{currentCard ? currentCard : <>Please select option below</>}</div>
        <div className="option">
            <div
            className={`button ${truthList.length === 0 ? "disabled" : ""}`}
            onClick={() => handleClick("TRUTH")}
            >
            Truth
            </div>
            <div
            className={`button ${dareList.length === 0 ? "disabled" : ""}`}
            onClick={() => handleClick("DARE")}
            >
            Dare
            </div>
        </div>
    </div>
  );
}

export default TruthOrDare;
