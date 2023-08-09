import { useEffect, useState } from "react";
import { ApiService } from "./ApiService";
import Board from "./components/Board";
import GameTile from "./components/GameTile";
import Nav from "./components/Nav";
import { Game } from "./models/Game";
import "./styles/App.css";

export default function App() {
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined)
    const api = new ApiService();

    useEffect(() => {
        // Do not run this method if there are Games in the array
        if (games.length > 0) return;


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
                    setGames([new Game(data)]);
                })
                .catch((err) => console.error("Failed creating game!", err));
        }
    }, [api, games]);

    const handleMenuClicked = () => {
        setSelectedGame(undefined)
    }

    const handleNewGameClicked = () => {
        api.create()
            .then((data) => {
                let newGames = games.slice();
                newGames.push(new Game(data));
                setGames(newGames);
            })
    }

    const onUpdate = (state: string[]) => {
        var updatedGames = games.slice();
        let updatedGame = updatedGames.find((game) => game.id === selectedGame?.id);
        if (updatedGame) {
            updatedGame.states.push(state)
            setGames(updatedGames);
        } else {
            console.error("Could not find game when updating!")
        }
    }

    return (
        <>
            <Nav onMenuClicked={() => handleMenuClicked()} onNewGameClicked={() => handleNewGameClicked()}></Nav>
            <div className="flex-container">
                {games.map((game: Game, index: number) => {
                    if (!selectedGame)
                        return <GameTile key={index} game={game} onTileClick={() => setSelectedGame(game)}></GameTile>
                    else
                        return null;
                })}
                {selectedGame && <Board game={selectedGame} onUpdateCallback={onUpdate}/>}
            </div>
        </>
    );
}
