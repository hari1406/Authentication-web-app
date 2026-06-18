import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isLoginEnabled, setIsLoginEnabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    setIsLoginEnabled(!isLoginEnabled);
    navigate(isLoginEnabled ? "/" : "/login");
  };

  const showToggle = location.pathname !== "/verify";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {showToggle && (
          <div className="toggle-container">
            <span className={`toggle-label signup-label ${!isLoginEnabled ? "active" : ""}`}>
              Sign Up
            </span>
            
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="auth-toggle"
                checked={isLoginEnabled}
                onChange={handleToggle}
                className="toggle-input"
              />
              <label htmlFor="auth-toggle" className="toggle-label-switch">
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <span className={`toggle-label login-label ${isLoginEnabled ? "active" : ""}`}>
              Login
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;