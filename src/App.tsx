import { useEffect, useState } from "react";
import { ApiService } from "./ApiService";
import Board from "./components/Board";
import GameTile from "./components/GameTile";
import { Game } from "./models/Game";
import "./styles/App.css";

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined)
  
  useEffect(() => {
    // Do not run this method if there are Games in the array
    if (games.length > 0) return;
    
    const api = new ApiService();

    api.getAll()
      .then((data) => {
        if (data.length === 0) {
          createGame();
        } else {
          let arr = JSON.parse(data);
          let gamesArr = new Array<Game>()
          arr.forEach((g: any) => {
            gamesArr.push(new Game(JSON.stringify(g)))
          });
          setGames(gamesArr)
        };
      })
      .catch((err) => console.error("Failed getting all games!", err));

    function createGame() {
      api.create()
        .then((data) => {
          setGames([JSON.parse(data)]);
        })
        .catch((err) => console.error("Failed creating game!", err));
    }
  }, [games]);

  return (
    <>
        <div className="flex-container">
            {games.map((game: Game, index: number) => {
                if (!selectedGame)
                    return <GameTile key={index} game={game} onTileClick={() => setSelectedGame(game)}></GameTile>
                else
                    return null;
            })}
            {selectedGame && <Board game={selectedGame} />}
        </div>
    </>
  );
}