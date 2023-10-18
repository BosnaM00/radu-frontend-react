import React from "react";
import SearchForm from "./components/SearchForm";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={<LoginForm setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/login"
          element={<LoginForm setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/search"
          element={
            isAuthenticated ? (
              <SearchForm />
            ) : (
              <LoginForm setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
