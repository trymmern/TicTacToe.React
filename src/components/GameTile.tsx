import { MouseEventHandler } from "react";
import { Game } from "../models/Game";
import "../styles/GameTile.css";

export default function GameTile({game, onTileClick, onDeleteClick}: 
    {game: Game, onTileClick: MouseEventHandler, onDeleteClick: MouseEventHandler}) {

    const lastState = game.states.at(-1);
    console.log(game.winner)

    return (
        <>
                <div className="game-tile">
                    <span className="header">Game {game.id}</span>
                    <div className={`frame ${game.winner ? "green" : "red"}`} onClick={onTileClick}>
                        {lastState?.map((value: string, index: number) => {
                            return <div key={index} className="game-tile-square">{value}</div>
                        })}
                    </div>
                </div>
                {/* <button className="menu-btn" onClick={onDeleteClick}>DELETE</button> */}
        </>
    )
}