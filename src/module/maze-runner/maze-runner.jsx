import React, { useState, useEffect } from "react";
import "./maze-runner.css";
const CELL_SIZE = 32;
const GRID_SIZE = 20;
const WIDTH = GRID_SIZE * CELL_SIZE;
const HEIGHT = GRID_SIZE * CELL_SIZE;

const directions = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];



function MazeRunner() {
  
  const maze = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0],
    [0,1,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,0,1,0],
    [0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0],
    [0,1,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0],
    [0,1,0,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,0],
    [0,1,1,1,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0],
    [0,1,0,0,1,1,1,1,1,0,1,0,1,0,0,0,0,0,1,0],
    [0,0,0,0,0,1,0,1,1,0,1,1,1,0,1,1,1,0,1,0],
    [0,0,1,1,1,1,0,1,0,0,0,0,1,0,1,0,1,0,1,0],
    [0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,0,1,0,1,0],
    [0,0,1,0,1,1,1,1,1,1,0,1,0,0,0,0,1,0,1,0],
    [0,1,1,0,1,0,1,1,0,1,0,1,1,1,0,1,1,1,1,0],
    [0,0,1,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0],
    [0,1,1,0,1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,0],
    [0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0],
    [0,1,0,1,1,1,1,0,0,0,0,1,0,1,1,1,1,0,1,0],
    [0,1,0,1,0,1,0,0,1,1,1,1,0,1,0,0,1,0,1,0],
    [0,1,1,1,0,1,1,0,1,0,0,0,0,1,1,0,1,1,1,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],

  ]
  const [player, setPlayer] = useState({ x: 14, y: 0 });
  const [win, setWin] = useState(false)
  const destination = {x:8, y:19}
  const moveCharacter = (e) => {
    if(win)
      return
    setPlayer((prevPlayer) => {
      let { x, y } = prevPlayer;
      let newX = x;
      let newY = y;
  
      if (e.key === "ArrowUp" && y > 0 && maze[y - 1][x] === 1) newY--;
      if (e.key === "ArrowDown" && y < GRID_SIZE - 1 && maze[y + 1][x] === 1) newY++;
      if (e.key === "ArrowLeft" && x > 0 && maze[y][x - 1] === 1) newX--;
      if (e.key === "ArrowRight" && x < GRID_SIZE - 1 && maze[y][x + 1] === 1) newX++;
      return { x: newX, y: newY };
    });
  
  };
  const checkWin = ()=>{
    return player.x === destination.x && player.y === destination.y
  }
  useEffect(() => {
    const handleKeydown = (e) => moveCharacter(e);
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
  useEffect(() => {
    if (player.x === destination.x && player.y === destination.y) {
      setWin(true);
    }
  }, [player]); // Lắng nghe thay đổi của `player`
  

  return (
    <div className="maze" style={{ width: WIDTH, height: HEIGHT }}>
      {!win && maze.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={`cell ${cell ? "path" : "wall"} ${player.x === x && player.y === y ? "player" : ""} ${destination.x === x && destination.y === y ? "destination" : ""}`}
            style={{ width: CELL_SIZE, height: CELL_SIZE }}
          ></div>
        ))
      )}
      {win && <div className="win-screen">
          <div className="manh-character"></div>
          <div className="wall" style={{ width: CELL_SIZE, height: CELL_SIZE }}></div>
          <div className="hlamb-character"></div>
      
        </div> }
    </div>
  );
}

export default MazeRunner;
