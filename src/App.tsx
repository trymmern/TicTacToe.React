import { useEffect, useMemo, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { ApiService } from "./Services/ApiService";
import Board from "./components/Board";
import Footer from "./components/Footer";
import GameTile from "./components/GameTile";
import Login from "./components/Login";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import { Game } from "./models/Game";
import { User } from "./models/User";
import "./styles/App.sass";

export const WS_URL = "ws:localhost:5268/ws/connect"
export const EVENTS = {
    USEREVENT: "userEvent",
    ACTIVITYEVENT: "activityEvent",
    GAMEEVENT: "gameEvent"
}

export function isUserEvent(message: any) {
    let evt = JSON.parse(message.data);
    return evt.eventType === EVENTS.USEREVENT;
}

export function isActivityEvent(message: any) {
    let evt = JSON.parse(message.data);
    return evt.eventType === EVENTS.ACTIVITYEVENT;
}

export function isGameEvent(message: any) {
    let evt = JSON.parse(message.data);
    return evt.type === EVENTS.GAMEEVENT;
}

export default function App() {
    const [user, setUser] = useState<User | null>(new User("Bob Arne"));
    const [users, setUsers] = useState<User[]>([new User("Trym"), new User("Ole Finn")]);
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined)
    const api = useMemo(() => new ApiService(), []);
    
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`${WS_URL}?userId=${user?.id}`, {
        onOpen: () => console.log("WebSocket connection established"),
        onClose: () => console.log("WebSocket connection closed"),
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true
    }, user ? true : false);

    useEffect(() => {
        if (user && readyState === ReadyState.OPEN) {
            sendJsonMessage({
                user: JSON.stringify(user),
                type: EVENTS.USEREVENT
            });

            if (!users.includes(user!)) {
                const nextUsers = users.slice();
                nextUsers.push(user!)
                setUsers(nextUsers);
            }
        }

        // Do not run if there are Games in the array
        if (games.length > 0) return;

        api.getAll()
            .then((data) => {
                setGames(parseGameArrayJson(data))
            })
            .catch((err) => console.error("Received an error while getting all games", err));
    }, [api, games, user, readyState, sendJsonMessage, lastJsonMessage, users]);

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
            {!user ? 
                <Login users={users} onLogin={setUser} /> 
                :
                <div id="content">
                    <Nav user={user} onMenuClicked={() => handleMenuClicked()} onNewGameClicked={() => handleNewGameClicked()}></Nav>
                    <div className="flex-container">
                        <div className="games">
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
                        <SideBar user={user} users={users}></SideBar>
                    </div>
                    <Footer user={user} users={users}></Footer>
                </div>
            }
        </>
    );
}
