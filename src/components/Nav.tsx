import { MouseEventHandler } from "react";
import "../styles/Nav.css";

export default function Nav({onMenuClicked, onNewGameClicked}: 
    {onMenuClicked: MouseEventHandler, onNewGameClicked: MouseEventHandler}) {

    return (
        <div className="menu-bar">
            <button className="menu-btn" onClick={onMenuClicked}>HOME</button>
            <button className="menu-btn" onClick={onNewGameClicked}>NEW GAME</button>
        </div>
    )
}