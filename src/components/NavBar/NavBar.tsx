import React from "react";
import "./NavBar.css";

import useFirebaseAuthState from "../../hooks/useFirebaseAuthState";

export const NavBar: React.FC = () => {
  const { user, signInWithGoogle, signOutWithGoogle } = useFirebaseAuthState();

  return (
    <div className="nav-bar">
      <h1>🥟 DUMPLING CRAWLER 🥟</h1>
      {user ? (
        <>
          <span>Hello, {user.displayName}!</span>
          <button onClick={signOutWithGoogle}>Log Out</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Log In</button>
      )}
    </div>
  );
};
