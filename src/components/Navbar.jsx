import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Task Manager
      </Link>
      {user && (
        <div className="navbar-user">
          <span>{user.email}</span>
          <button onClick={handleLogout} className="btn btn-secondary">
            Log out
          </button>
        </div>
      )}
    </nav>
  );
}
