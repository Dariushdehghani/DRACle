import { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import api from "../lib/api.js"

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get("/auth/me")
        .then((res) => {
            setUser(res.data)
        })
        .catch(() => {
            setUser(null)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <AuthContext.Provider
        value={{
            user,
            setUser,
            loading
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}