import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const register = async (username, email, password, password2) => {
  try {
    console.log("Starting registration process");
    console.log("Registration payload:", {
      username,
      email,
      password: "***",
      confirm_password: "***",
    });

    const response = await api.post("users/api/register/", {
      username,
      email,
      password,
      confirm_password: password2,
    });

    console.log("Registration API response:", response);
    console.log("Registration successful, user data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration error details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });

    // Extract detailed error message if available
    let errorMessage = "Registration failed";
    if (error.response?.data) {
      if (typeof error.response.data === "string") {
        errorMessage = error.response.data;
      } else if (error.response.data.error) {
        errorMessage = error.response.data.error;
      } else if (error.response.data.non_field_errors) {
        errorMessage = error.response.data.non_field_errors[0];
      } else {
        // Try to extract specific field errors
        const fieldErrors = Object.entries(error.response.data)
          .map(([field, errors]) => {
            if (Array.isArray(errors)) {
              return `${field}: ${errors[0]}`;
            }
            return `${field}: ${errors}`;
          })
          .join(", ");

        if (fieldErrors) {
          errorMessage = fieldErrors;
        }
      }
    }

    throw new Error(errorMessage);
  }
};

// Update the login function
export const login = async (email, password) => {
  try {
    const response = await api.post("users/api/login/", {
      username: email, // If your backend expects username but you're using email in UI
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data);

    let errorMessage = "Invalid email or password";
    if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    }

    throw new Error(errorMessage);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get("users/auth/profile/");
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to fetch user profile" };
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.patch("users/auth/profile/", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to update profile" };
  }
};

export const postReview = async (movieId, reviewData, type = "film") => {
  const token = localStorage.getItem("authToken");
  let url;
  if (type === "series") {
    url = `http://localhost:8000/videos/series/${movieId}/reviews/`;
  } else {
    url = `http://localhost:8000/videos/films/${movieId}/reviews/`;
  }
  return (
    await axios.post(url, reviewData, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};

export const deleteReview = async (movieId, reviewId) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.delete(
      `http://localhost:8000/videos/reviews/${reviewId}/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to delete review" };
  }
};
