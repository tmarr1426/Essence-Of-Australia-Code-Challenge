import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import GameDetails from "./pages/GameDetails";
import Register from "./pages/Register";
// import NotFound from "./pages/NotFound";

function App() {
    return (
            <AuthProvider>
      <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute>
                                        <Home />
                                      </ProtectedRoute>} />
            {/* <Route path="/games/:id" element={<GameDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} /> */}
        </Routes>
        </AuthProvider>
    );
}

export default App;