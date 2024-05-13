import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import NavBar from "../../components/NavBar";
import { USER_ROLES } from "../../constants/roles";

const Home = () => {
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));
  //
  return (
    <>
      <NavBar />
      <div className="container">
        <header className="bg-light p-5 rounded-lg m-3">
          <h1>Welcome to Health Management System</h1>
          <p></p>
          {user && (
            <>
              <div className="alert alert-primary" role="alert">
                You are logged in as <strong>{user.role}</strong>
              </div>
              <h3>Welcome, {user.name}</h3>
              <button onClick={logout} className="btn btn-danger">
                Logout
              </button>
              {(user.role === USER_ROLES.STUDENT ||
                user.role === USER_ROLES.DOCTOR) && (
                <button className="btn btn-primary mx-2">
                  <a
                    href={
                      user.role === USER_ROLES.STUDENT ? "/student" : "/doctor"
                    }
                    className="text-white text-decoration-none"
                  >
                    {user.role === USER_ROLES.STUDENT
                      ? "Student Dashboard"
                      : "Doctor Dashboard"}
                  </a>
                </button>
              )}
            </>
          )}

          {!user && (
            <>
              <p>
                Please <a href="/login">login</a> to continue
              </p>
            </>
          )}
        </header>
      </div>
    </>
  );
};

export default Home;
