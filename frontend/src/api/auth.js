import axios from "axios";

const API_BASE_URL = "http://localhost:8000/users/api";

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register/`, {
      username,
      email,
      password,
      confirm_password: password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
