import Avatar from "react-avatar"

export default function Footer({user, users}: {user: string, users: string[]}) {
    return (
        <div className="footer-container">
            {users.filter((u) => u !== user).map((u) => {
                return (
                    <div key={u}>
                        <span key={u} id={u} className="user-info">
                            <Avatar name={u} size="40" round="20px"></Avatar>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}