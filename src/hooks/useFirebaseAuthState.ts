import { useContext } from "react";
import { FirebaseContext } from "../App";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";

const useFirebaseAuthState = () => {
  const { auth } = useContext(FirebaseContext);
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOutWithGoogle = () => {
    return user && auth.signOut();
  };
  return { user, signInWithGoogle, signOutWithGoogle };
};

export default useFirebaseAuthState;
