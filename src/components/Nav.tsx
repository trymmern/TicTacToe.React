import { MouseEventHandler } from "react";
import Avatar from "react-avatar";
import { UncontrolledTooltip } from "reactstrap";
import { User } from "../models/User";
import "../styles/Nav.sass";

export default function Nav({user, onMenuClicked, onNewGameClicked}: 
    {user: User, onMenuClicked: MouseEventHandler, onNewGameClicked: MouseEventHandler}) {

    return (
        <div className="menu-bar">
            <div className="menu-btns">
                <button className="menu-btn" onClick={onMenuClicked}>HOME</button>
                <button className="menu-btn" onClick={onNewGameClicked}>NEW GAME</button>
            </div>
            <span id={user.id} className="user-info" key={user.id}>
                <Avatar name={user.name} size="40" round="20px"></Avatar>
            </span>
            <UncontrolledTooltip placement="bottom" target={user.id}>
                {user.name}
            </UncontrolledTooltip>
        </div>
    )
}