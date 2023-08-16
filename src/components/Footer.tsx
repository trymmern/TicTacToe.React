import Avatar from "react-avatar";
import { UncontrolledTooltip } from "reactstrap";
import { User } from "../models/User";
import "../styles/Footer.sass";

export default function Footer({user, users}: {user: User, users: User[]}) {
    return (
        <div id="footer" className="footer-container">
            {users.filter((u) => u.id !== user.id).map((u) => {
                return (
                    <div key={u.id}>
                        <span key={u.id} id={u.id} className="user-info">
                            <Avatar name={u.name} size="40" round="20px" color={u.color} />
                        </span>
                        <UncontrolledTooltip placement="bottom" target={u.id}>
                            {u.name}
                        </UncontrolledTooltip>
                    </div>
                )
            })}
        </div>
    )
}