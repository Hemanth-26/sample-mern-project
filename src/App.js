import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Register from "./pages/Register";
import { PublicRoute, PrivateRoute } from "./routes";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          exact
          path="/register"
          element={PublicRoute(Register)}
        />
        <Route
          exact
          path="/login"
          element={PublicRoute(Login)}
        /><Route
          exact
          path="/dashboard"
          element={PrivateRoute(Dashboard)}
        />
      </Routes>
    </div>
  );
}

export default App;
