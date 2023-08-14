import { useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { WS_URL } from "../App";
import "../styles/Login.sass";

export default function Login({onLogin}: {onLogin: Function}) {
    const [username, setUsername] = useState("");

    useWebSocket(WS_URL, {
        share: true,
        filter: () => false
    });

    const loginUser = (e: string) => {
        if (!username.trim()) {
            return;
        }
        
        onLogin && onLogin(e)
    }

    return (
        <div className="login-container">
            <input 
                value={username} 
                name="username"
                placeholder="USERNAME"
                onChange={(e) => setUsername((e.target as HTMLInputElement).value)} 
                className="form-control" />
            <button type="submit" onClick={() => loginUser(username)} className="menu-btn">LOG IN</button>
        </div>
    )
} 