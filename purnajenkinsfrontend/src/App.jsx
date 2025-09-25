// src/App.jsx
import React from "react";
import UserManager from "./components/UserManager";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>User Management</h1>
      <UserManager />
    </div>
  );
}

export default App;
