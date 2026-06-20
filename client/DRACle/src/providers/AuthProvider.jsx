import { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import api from "../lib/api.js"

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [academy, setAcademy] = useState(() => sessionStorage.getItem("academy"))
    const [academyId, setAcademyId] = useState(() => sessionStorage.getItem("academyId"))
    const [role, setRole] = useState(() => sessionStorage.getItem("role"))
    const [requests, setRequests] = useState(null)

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
            loading,
            academy,
            setAcademy,
            academyId,
            setAcademyId,
            role,
            setRole
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}