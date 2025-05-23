export const checkEmailExistence = async (email) => {
  try {
    const response = await fetch(
      "http://localhost:8000/users/api/check-email/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to check email existence");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
};
