import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Intro from "../pages/Intro"

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Login />} />
                <Route path="/dash" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}