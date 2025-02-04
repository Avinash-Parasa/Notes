import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import AlertState from "./context/alert/alertState";
import Alert from "./components/Alert";
import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import Signup from "./components/Auth/Signup";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import AllNotes from "./components/AllNotes";
import Favourites from "./components/Favourites";

function App() {
  return (
    <AlertState>
      <NoteState>
        <Router>
          <div className="app-container">
            <Navbar />
            <div className="main-content">
              <Alert />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/allnotes" element={<AllNotes />} />
                <Route path="/favourites" element={<Favourites />} />
              </Routes>
            </div>
          </div>
        </Router>
      </NoteState>
    </AlertState>
  );
}

export default App;
