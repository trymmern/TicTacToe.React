import Avatar from "react-avatar";
import { UncontrolledTooltip } from "reactstrap";
import "../styles/Footer.sass";

export default function Footer({user, users}: {user: string, users: string[]}) {
    return (
        <div className="footer-container">
            {users.filter((u) => u !== user).map((u) => {
                return (
                    <div>
                        <span key={u} id={u} className="user-info">
                            <Avatar name={u} size="40" round="20px" />
                        </span>
                        <UncontrolledTooltip placement="bottom" target={u}>
                            {u}
                        </UncontrolledTooltip>
                    </div>
                )
            })}
        </div>
    )
}