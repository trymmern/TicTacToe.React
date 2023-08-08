import { useMemo, useState } from "react";
import { ApiService } from "../ApiService";
import { Game } from "../models/Game";
import "../styles/Board.css";
import Square from "./Square";

export default function Board({game}: {game: Game}) {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const api = useMemo(() => new ApiService(), []);

  function handleClick(i: number) {
    if (squares[i] || checkWinCondition(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    update(nextSquares)
    setXIsNext(!xIsNext);
    
    checkWinCondition(squares)
  }
  
  function update(state: string[]): void {
    console.log(game)
    api.update(game.id, state)
      .then(() => {
        setSquares(state);
        console.log("Updated game with id", game.id);
      })
      .catch((err) => console.error("Failed updating game!", err));
  }

  game.winner = checkWinCondition(squares);
  let status;
  if (game.winner) {
    status = "Winner: " + game.winner;
  } else {
    status = "Next player: " + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-flex-container">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function checkWinCondition(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
