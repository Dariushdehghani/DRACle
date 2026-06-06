import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Intro from "../pages/Intro"
import Signup from "../pages/Signup"
import Classes from "../pages/Classes"
import Assignment from "../pages/Assignment"
import Settings from "../pages/Settings"
import Messages from "../pages/Messages"
import ProtectedRoute from "../routes/ProtectedRoute"
import NotFound from "../pages/NotFound"

export default function Router({
  user: User
}){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dash" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/assign" element={<Assignment />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
}