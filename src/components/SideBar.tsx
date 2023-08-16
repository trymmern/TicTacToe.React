import { User } from "../models/User";
import "../styles/SideBar.sass";
import Activity from "./Activity";

export default function SideBar({user, users}: {user: User, users: User[]}) {
    return (
        <div className="side-bar">
            <Activity user={user} users={users} />
        </div>
    )
}