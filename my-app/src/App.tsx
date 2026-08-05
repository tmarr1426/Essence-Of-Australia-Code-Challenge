/**
 * App.tsx (src/App.tsx)
 *
 * Root component for the Game Voting application.
 *
 * Responsibilities:
 * - Initializes the React application structure
 * - Defines the main application layout
 * - Handles global providers and application-level configuration
 * - Loads the primary application views/components
 *
 * Dependencies:
 * - React Router (if applicable)
 * - Global context providers
 * - Application components
 *
 * Notes:
 * - This component should remain lightweight
 * - Business logic should be handled through hooks, services, and components
 */

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