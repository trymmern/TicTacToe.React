import { MouseEventHandler } from "react";
import Avatar from "react-avatar";
import { UncontrolledTooltip } from "reactstrap";
import "../styles/Nav.sass";

export default function Nav({username, onMenuClicked, onNewGameClicked}: 
    {username: string, onMenuClicked: MouseEventHandler, onNewGameClicked: MouseEventHandler}) {

    return (
        <div className="menu-bar">
            <div className="menu-btns">
                <button className="menu-btn" onClick={onMenuClicked}>HOME</button>
                <button className="menu-btn" onClick={onNewGameClicked}>NEW GAME</button>
            </div>
            <span id={username} className="user-info" key={username}>
                <Avatar name={username} size="40" round="20px"></Avatar>
            </span>
            <UncontrolledTooltip placement="bottom" target={username}>
                {username}
            </UncontrolledTooltip>
        </div>
    )
}