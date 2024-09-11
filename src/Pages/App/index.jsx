// Hooks
// import { useState } from 'react'
import { BrowserRouter } from "react-router-dom"
import { useContext } from "react"

// Context
import {LoginContext, LoginContextProvider, ContextProvider } from "../../Context"

// Routes
import AppRoutes from "../../Routes"

// Components
import LogoutMessage from "../../Components/LogoutMessage"
import Navbar from "../../Components/Navbar"

// Styles
import "./App.css"
import LoginNavbar from "../../Components/LoginNavbar"

function App() {
  const loginContext  = useContext(LoginContext); // Asegúrate de usar 'logedIn', ya que así lo defines en el contexto
  return (
    <BrowserRouter>
      {loginContext.logedIn ? (
        <>
          { loginContext.logoutWindow && <LogoutMessage />}
          <Navbar />
          <AppRoutes />
        </>
      ) : (
          <>
          <LoginNavbar />
          <AppRoutes />
        </>
      )}
    </BrowserRouter>
  );
}

export default function Root() {
  return (
    <LoginContextProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </LoginContextProvider>

  );
}