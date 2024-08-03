import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { getEvents, updateEvent, deleteEvent } from "../services/eventservice";
import "./eventList.css";

function EventList() {
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [eventDetails, setEventDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data.reverse());
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    fetchEvents();
  }, []);

  const openModel = (event) => {
    setEventDetails(event);
    setShow(true);
  };

  function closeModal() {
    setShow(false);
  }

  const customforreport = {
    content: {
      width: "500px",
      height: "400px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      overflow: "hidden",
      zIndex: 2,
    },
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    console.log(eventDetails, "details after editing");
    try {
      const response = await updateEvent({
        eventDetails,
      });
      setEvents(response.data.reverse());
      alert("Event Updated Successfully");
      setShow(false);
    } catch (error) {}
  };

  const handleDeleteEvent = async (event) => {
    try {
      const response = await deleteEvent({
        event,
      });
      setEvents(response.data.reverse());
      console.log(response);
      alert("Event Deleted Successfully");
      setShow(false);
    } catch (error) {}
  };

  const create = () => {
    navigate("/create-event");
  };

  return (
    <div>
      <div className="list-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
          }}
        >
          <h2>All Events</h2>
          <button className="buttons" onClick={create}>
            Create Event
          </button>
        </div>

        <ul className="event-grid">
          {events.map((event) => (
            <li key={event._id} className="blog-card">
              <h3>Ttile: {event.title}</h3>
              <p>Description: {event.description}</p>
              <p>Date: {event.date.split("T")[0]}</p>
              <p>Location: {event.location}</p>
              <div className="button-container">
                <button className="buttons" onClick={() => openModel(event)}>
                  Update
                </button>
                <button
                  className="buttons"
                  onClick={() => handleDeleteEvent(event)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal
        isOpen={show}
        onRequestClose={closeModal}
        style={customforreport}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleUpdateEvent} className="form-container">
          <h1>Create New Event</h1>

          <div className="input-fields">
            <label>Title</label>
            <input
              type="text"
              style={{ padding: "5px" }}
              placeholder="Title"
              value={eventDetails.title}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, title: e.target.value })
              }
            />
          </div>
          <div className="input-fields">
            <label>Description</label>
            <input
              type="text"
              style={{ padding: "5px" }}
              placeholder="Description"
              value={eventDetails.description}
              onChange={(e) =>
                setEventDetails({
                  ...eventDetails,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="input-fields">
            <label>Date</label>
            <input
              type="date"
              style={{ padding: "5px" }}
              value={eventDetails.date}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, date: e.target.value })
              }
            />
          </div>
          <div className="input-fields">
            <label>location</label>
            <input
              type="text"
              style={{ padding: "5px" }}
              placeholder="Location"
              value={eventDetails.location}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, location: e.target.value })
              }
            />
          </div>

          <button type="submit" className="buttons">
            Update Event
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default EventList;
