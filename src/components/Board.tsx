import { useMemo, useState } from "react";
import { ApiService } from "../Services/ApiService";
import { Game } from "../models/Game";
import "../styles/Board.sass";
import Square from "./Square";

export default function Board({game, onUpdateCallback}: {game: Game, onUpdateCallback: Function}) {
  const [squares, setSquares] = useState<string[]>(initSquares());
  const [xIsNext, setXIsNext] = useState<boolean>(initXIsNext());
  const api = useMemo(() => new ApiService(), []);

  function initSquares(): string[] {
    if (game.states.length > 0)
      return game.states[game.states.length-1];
    else
      return new Array(9).fill(null)
  }

  function initXIsNext(): boolean {
    const xCount = game.states[game.states.length-1].filter((s) => s === "X").length
    const oCount = game.states[game.states.length-1].filter((s) => s === "O").length

    return xCount > oCount ? false : true;
  }

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

    update(nextSquares);
    setXIsNext(!xIsNext);
  }
  
  function update(state: string[]): void {
    game.winner = checkWinCondition(state);
    api.update(game.id, state, game.winner)
      .then(() => {
        setSquares(state);
        onUpdateCallback(state);
      })
      .catch((err) => console.error("Failed updating game!", err));
  }

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
        <div className={`board-flex-container ${game.winner ? "green" : "red"}`}>
          {Array(9).fill(0).map((_, i) =>{
            return <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
          })}
        </div>
      </div>
    </>
  );
}

function checkWinCondition(squares: string[]): string | null {
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
