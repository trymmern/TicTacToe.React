import { useState } from "react";
import { User } from "../models/User";
import "../styles/Login.sass";

export default function Login({users, onLogin}: {users: User[], onLogin: Function}) {
    const [user, setUser] = useState<User>(new User(""));

    const loginUser = (user: User) => {
        if (!user.name.trim()) {
            return;
        }

        if (users.filter(u => u.id === user.id).length > 0) {
            user.id = user.id + Math.round(Math.random() * 100)
        }
        
        onLogin && onLogin(user)
    }

    return (
        <div className="login-container">
            <input 
                value={user.name} 
                name="username"
                placeholder="USERNAME"
                onChange={(e) => setUser(new User((e.target as HTMLInputElement).value))} 
                className="form-control" />
            <button type="submit" onClick={() => loginUser(user)} className="menu-btn">LOG IN</button>
        </div>
    )
} 