import { MouseEventHandler } from "react";
import "../styles/Nav.css";

export default function Nav({onMenuClicked, onNewGameClicked}: 
    {onMenuClicked: MouseEventHandler, onNewGameClicked: MouseEventHandler}) {

    return (
        <div className="menu-bar">
            <button className="nav-button" onClick={onMenuClicked}>Menu</button>
            <button className="nav-button" onClick={onNewGameClicked}>New game</button>
        </div>
    )
}