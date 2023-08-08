import { MouseEventHandler } from "react";
import { Game } from "../models/Game";
import "../styles/GameTile.css";

export default function GameTile({game, onTileClick}: {game: Game, onTileClick: MouseEventHandler}) {

    const lastState = game.states.at(-1);
    console.log(lastState)

    return (
        <>
            <div className="game-tile">
                <span className="header">Game {game.id}</span>
                <div className="frame" onClick={onTileClick}>
                    {lastState?.map((value: string, index: number) => {
                        return <div key={index} className="game-tile-square">{value}</div>
                    })}
                </div>
            </div>
        </>
    )
}