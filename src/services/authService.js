import axios from "axios";

export const loginUser = async (email, password) => {
  const response = await axios.post(`http://localhost:8080/auth/login`, {
    email,
    password,
  });
  return response;
};

export const registerUser = async (email, password, userName, mobileNumber) => {
  const response = await axios.post("http://localhost:8080/auth/register", {
    email,
    password,
    userName,
    mobileNumber,
  });
  return response;
};
