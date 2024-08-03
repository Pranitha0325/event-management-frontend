import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import CreateEvent from "./components/CreateEvent";
import EventList from "./components/EventList";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events" element={<EventList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
