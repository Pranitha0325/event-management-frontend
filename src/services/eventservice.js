import axios from "axios";

export const createEvent = async (eventData) => {
  const response = await axios.post(`http://localhost:8080/events`, eventData);
  return response;
};

export const getEvents = async () => {
  const response = await axios.get(`http://localhost:8080/events`);
  return response;
};

export const updateEvent = async (eventData) => {
  console.log(eventData.eventDetails, "to be updated");
  const response = await axios.put(
    `http://localhost:8080/events/${eventData.eventDetails._id}`,
    eventData.eventDetails
  );
  return response;
};

export const deleteEvent = async (event) => {
  console.log(event.event, "to be deleted");
  const response = await axios.delete(
    `http://localhost:8080/events/delete/${event.event._id}`
  );
  return response;
};
