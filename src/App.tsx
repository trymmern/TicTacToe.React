import { useEffect, useMemo, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { ApiService } from "./Services/ApiService";
import Board from "./components/Board";
import Footer from "./components/Footer";
import GameTile from "./components/GameTile";
import Login from "./components/Login";
import Nav from "./components/Nav";
import { Game } from "./models/Game";
import "./styles/App.sass";

export const WS_URL = "ws:localhost:5268/ws/connect"
export const EVENTS = {
    USEREVENT: "userevent",
    GAMEEVENT: "gameevent"
}

function isUserEvent(message: any) {
    let evt = JSON.parse(message.data);
    return evt.type === EVENTS.USEREVENT;
}

function isGameEvent(message: any) {
    let evt = JSON.parse(message.data);
    return evt.type === EVENTS.GAMEEVENT;
}

export default function App() {
    const [username, setUsername] = useState("Trym");
    const [users, setUsers] = useState(["Trym", "Ole", "Knut", "Bodil"])
    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log("Websocket connection established");
        },
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true
    });

    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined)
    const api = useMemo(() => new ApiService(), []);

    useEffect(() => {
        if (username && readyState === ReadyState.OPEN) {
            sendJsonMessage({
                username,
                type: EVENTS.USEREVENT
            })
        }

        // Do not run if there are Games in the array
        if (games.length > 0) return;

        api.getAll()
            .then((data) => {
                if (JSON.parse(data).length === 0) {
                    api.create()
                        .then((newGameData) => {
                            console.log("Create game?")
                            setGames([new Game(newGameData)]);
                        })
                        .catch((err) => console.error("Received an error while creating game", err));
                } else {
                    setGames(parseGameArrayJson(data))
                };
            })
            .catch((err) => console.error("Received an error while getting all games", err));
    }, [api, games, username, readyState, sendJsonMessage]);

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

    const handleDeleteClicked = (id: number) => {
        api.delete(id)
            .then((data) => {
                setGames(parseGameArrayJson(data));
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

    const parseGameArrayJson = (json: any) => {
        let arr = JSON.parse(json);
        let gamesArr = new Array<Game>();
        arr.forEach((g: any) => {
            gamesArr.push(new Game(JSON.stringify(g)));
        });
        return gamesArr;
    }

    return (
        <>
            {!username ? 
                <Login onLogin={(e: string) => setUsername(e)} /> 
                :
                <div id="content">
                    <Nav username={username} onMenuClicked={() => handleMenuClicked()} onNewGameClicked={() => handleNewGameClicked()}></Nav>
                    <div className="flex-container">
                        {games.map((game: Game, index: number) => {
                            if (!selectedGame)
                                return <GameTile key={index} game={game} 
                                    onTileClick={() => setSelectedGame(game)}
                                    onDeleteClick={() => handleDeleteClicked(game.id)}></GameTile>
                            else
                                return null;
                        })}
                        {selectedGame && <Board game={selectedGame} onUpdateCallback={onUpdate}/>}
                    </div>
                    <Footer user={username} users={users}></Footer>
                </div>
            }
        </>
    );
}
