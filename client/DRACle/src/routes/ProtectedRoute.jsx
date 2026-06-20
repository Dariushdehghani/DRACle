import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext" 

export default function ProtectedRoute({ children }) {
    const { user, loading, role, academy } = useAuth()
    const location = useLocation()

    if (loading) {
      return <p>Loading...</p>
    }

    if (!user) {
      return <Navigate to="/login" />
    }

    if(!academy || !role) {
      return <Navigate 
      to="/select-role" 
      state={{
        from: location
      }}
      />
    }

  return children
}