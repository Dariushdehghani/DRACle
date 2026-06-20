import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import SocketContext from "../context/SocketContext";

export default function SocketProvider({ children }) {
    const { user } = useAuth
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        if (!user) return;
        const s = io(
            "http://localhost:5000",
            { withCredentials: true }
        )
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [user])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}