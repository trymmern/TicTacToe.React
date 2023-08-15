import { useEffect, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { WS_URL } from "../App";
import { User } from "../models/User";

export default function History({user}: {user: User}) {
    const [history, setHistory] = useState<string[]>([]);
    const { lastJsonMessage, lastMessage } = useWebSocket(`${WS_URL}?userId=${user.id}`, {
        share: true
    });

    console.log(lastJsonMessage, lastMessage);

    useEffect(() => {
        if (lastMessage?.data) {
            let nextHistory = history.slice();
            nextHistory.push(lastMessage?.data);
            setHistory(nextHistory);
        }
    }, [lastMessage?.data]);


    return (
        <ul>
            {history.map((data: string, index: number) => {
                return <li key={index}>{data}</li>
            })}
        </ul>
    );
}