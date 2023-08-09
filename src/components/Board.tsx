import { useMemo, useState } from "react";
import { ApiService } from "../ApiService";
import { Game } from "../models/Game";
import "../styles/Board.css";
import Square from "./Square";

export default function Board({game, onUpdateCallback}: {game: Game, onUpdateCallback: Function}) {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(game.states.length > 0 ? game.states[game.states.length-1] : new Array(9).fill(null));
  const api = useMemo(() => new ApiService(), []);

  function handleClick(i: number) {
    if (squares[i] || game.winner) {
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
        onUpdateCallback(state);
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
      <div className="flex-container-col">
        <h1 className="status">{status}</h1>
        <div className="board-flex-container">
          {Array(9).fill(0).map((_, i) =>{
            return <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
          })}
        </div>
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
