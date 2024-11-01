import React from "react";
import { Link } from "react-router-dom";
import useFirebaseAuthState from "../../hooks/useFirebaseAuthState";
import "./NavBar.css";

export const NavBar: React.FC = () => {
  const { user, signInWithGoogle, signOutWithGoogle } = useFirebaseAuthState();

  const firstName = user?.displayName.split(" ")[0] || "";

  return (
    <div className="nav-bar">
      <div className="links">
        <Link to="/" className="head-link">
          🥟 CRAWLER
        </Link>
        {user ? (
          <div>
            <Link to="/results" className="results-link">
              See Current Results 🔗
            </Link>
          </div>
        ) : null}
      </div>

      {user ? (
        <>
          <div className="login">
            <button onClick={signOutWithGoogle}>
              <span>Hello, {firstName}!</span> - Log Out
            </button>
          </div>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Log In</button>
      )}
    </div>
  );
};
