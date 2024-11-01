import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/Main";
import { ResultsPage } from "../pages/Results";
import { LoginPage } from "../pages/Login";
import { LandingPage } from "../pages/Landing";
import useFirebaseAuthState from "../hooks/useFirebaseAuthState";

export const Router: React.FC = () => {
  const { user } = useFirebaseAuthState();

  return (
    <Routes>
      <Route path="/" element={!user ? <LandingPage /> : <MainPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/results" element={<ResultsPage />}></Route>
      <Route path="/logOut" element={<LandingPage />}></Route>
    </Routes>
  );
};
