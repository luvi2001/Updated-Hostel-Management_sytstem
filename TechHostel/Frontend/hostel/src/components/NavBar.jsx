import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import LOGO from "../assets/logo.jpeg";
import { USER_ROLES } from "../constants/roles";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { logout, user, isAuthenticated } = useAuthStore((state) => ({
    logout: state.logout,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }));
  //
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#3b82f6" }}
    >
      {/* logo */}
      <a className="navbar-brand mx-3" href="/">
        <img
          src={LOGO}
          alt="Logo"
          style={{
            maxWidth: "100%",
            maxHeight: "45px",
            backgroundColor: "#fff",
          }}
          className="rounded"
        />
      </a>

      {/* vertical line using plain css */}
      <div
        className="d-none d-lg-block"
        style={{ borderLeft: "3px solid #fff", height: 40 }}
      ></div>

      {/* navbar links */}
      {isAuthenticated && (
        <div className="" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-3 px-2 bg-light rounded-pill">
              <Link
                className="nav-link text-dark fw-bold p-1"
                to="/health-info"
              >
                Health Info
              </Link>
            </li>
          </ul>
        </div>
      )}

      {user && user.role === USER_ROLES.WARDEN && (
        <div className="" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-3 px-2 bg-light rounded-pill">
              <button
                className="nav-link text-dark fw-bold p-1"
                onClick={openAddTaskModal}
              >
                Report Task
              </button>
            </li>
          </ul>
        </div>
      )}

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        {user && (
          <>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-3">
                <img
                  src={`https://api.dicebear.com/8.x/micah/svg?seed=${user?.name}&flip=true&backgroundType=gradientLinear&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`}
                  alt="User Avatar"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "2px solid #fff",
                  }}
                />{" "}
              </li>

              {(user.role === USER_ROLES.STUDENT ||
                user.role === USER_ROLES.DOCTOR) && (
                <li className="nav-item mx-2 align-self-center">
                  <a
                    className="btn btn-primary btn-outline-light"
                    href={
                      user.role === USER_ROLES.STUDENT ? "/student" : "/doctor"
                    }
                  >
                    Dashboard
                  </a>
                </li>
              )}

              <li className="nav-item mx-2 align-self-center">
                <button
                  // white border
                  className="btn btn-danger btn-outline-light"
                  onClick={() => {
                    logout();
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
