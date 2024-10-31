import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/Main";
import { ResultsPage } from "../pages/Results";
import { LoginPage } from "../pages/Login";
import { LandingPage } from "../pages/Landing";
import useFirebaseAuthState from "../hooks/useFirebaseAuthState";
import { RestRubricContext } from "../App";

export const Router: React.FC = () => {
  const { user } = useFirebaseAuthState();
  const { restaurants, rubric } = useContext(RestRubricContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          // <MainPage restaurants={restaurants} rubric={rubric} />
          !user ? (
            <LandingPage />
          ) : (
            <MainPage restaurants={restaurants} rubric={rubric} />
          )
        }
      ></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/results" element={<ResultsPage />}></Route>
      <Route path="/logOut" element={<LandingPage />}></Route>
    </Routes>
  );
};
