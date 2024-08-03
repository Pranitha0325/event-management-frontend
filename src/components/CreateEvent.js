import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventservice";
import "./createEvent.css";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await createEvent({
        title,
        description,
        date,
        location,
      });
      setMessage(`Event created: ${response.data.title}`);
      alert("Event Created Successfully");
      navigate("/events");
    } catch (error) {
      setMessage(error.response?.data?.error || "Event creation failed");
    }
  };

  const allEvents = () => {
    navigate("/events");
  };

  return (
    <div className="bg-container">
      <form onSubmit={handleCreateEvent} className="form-container">
        <h1>Create New Event</h1>

        <div className="input-fields">
          <label>Title</label>
          <input
            type="text"
            style={{ padding: "5px" }}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-fields">
          <label>Description</label>
          <input
            type="text"
            style={{ padding: "5px" }}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-fields">
          <label>Date</label>
          <input
            type="date"
            style={{ padding: "5px" }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="input-fields">
          <label>location</label>
          <input
            type="text"
            style={{ padding: "5px" }}
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button type="submit" className="buttons">
          Create Event
        </button>
      </form>
      <button className="buttons" onClick={allEvents}>
        All Events
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateEvent;
