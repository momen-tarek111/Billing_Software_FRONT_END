import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Menubar.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
const Menubar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthData, auth } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthData(null, null);
    navigate("/login");
  };
  useEffect(() => {
    const navbar = document.getElementById("navbarNav");
    if (navbar && navbar.classList.contains("show")) {
      const bsCollapse = window.bootstrap.Collapse.getInstance(navbar)
        || new window.bootstrap.Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  }, [location.pathname,auth]);
  const isActive = (path) => {
    return location.pathname === path;
  };
  const isAdmin = auth.role === "ROLE_ADMIN";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand" href="#">
        <img src={assets.logo} alt="Logo" height="40" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/dashboard") ? "text-warning" : ""}`}
              aria-current="page"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/explore") ? "fw-bold text-warning" : ""}`}
              to="/explore"
            >
              Explore
            </Link>
          </li>
          {isAdmin && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/items") ? "fw-bold text-warning" : ""}`}
                  to="/items"
                >
                  Manage Items
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/category") ? "fw-bold text-warning" : ""}`}
                  to="/category"
                >
                  Manage Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/users") ? "fw-bold text-warning" : ""}`}
                  to="/users"
                >
                  Manage Users
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/orders") ? "fw-bold text-warning" : ""}`}
              to="/orders"
            >
              Order History
            </Link>
          </li>
        </ul>
        {/* Add the dropdown userprofile */}
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={assets.profile} alt="" height={32} width={32} />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end account-List"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a href="#" className="dropdown-item">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="dropdown-item">
                  Activity log
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  href="#"
                  className="dropdown-item text-danger"
                  onClick={logout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Menubar;
