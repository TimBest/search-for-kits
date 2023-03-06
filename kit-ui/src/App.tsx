import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            Search for Kits
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="kitSearchInput" className="form-label">
            Kit Identifier
          </label>
          <input
            type="text"
            className="form-control"
            id="kitSearchInput"
            placeholder="XX-XXX-XXXX"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
