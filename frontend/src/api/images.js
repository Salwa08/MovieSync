import axios from "axios";

export async function fetchImages() {
  try {
    const response = await axios.get("http://localhost:8000/videos/get-movies/", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images");
  }
}
