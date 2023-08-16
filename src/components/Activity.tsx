import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { WS_URL, isActivityEvent } from "../App";
import { Message, UserActivityMessage } from "../models/MessageTypes";
import { User } from "../models/User";
import "../styles/Activity.sass";

export default function Activity({user, users}: {user: User, users: User[]}) {
    const { lastJsonMessage } = useWebSocket<UserActivityMessage>(`${WS_URL}?userId=${user.id}`, {
        share: true,
        filter: isActivityEvent
    });

    console.log(lastJsonMessage);

    const activity: Message[] = lastJsonMessage?.userActivity || [];

    const formatDate = (raw: string) => {
        return new Date(raw).toLocaleTimeString("no-nb", { hour: "2-digit", minute: "2-digit" });
    }

    const getColor = (userId: string) => {
        console.log(users.find((u) => u.id === userId), userId, users)
        return users.find((u) => u.id === userId)?.color;
    }

    return (
        <ul>
            {activity.map((data: Message, index: number) => {
                return (
                    <li key={index}>
                        <span className="timestamp">{formatDate(data.timestamp)}</span>
                        <span className="message">
                            {data.userId && <span className="username" style={{color: getColor(data.userId)}}>{data.username}: </span>}
                            {data.message}
                        </span>
                    </li>
                )
            })}
        </ul>
    );
}