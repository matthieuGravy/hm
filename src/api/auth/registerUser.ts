import axios from "axios";
import { RegisterData } from "@/types/auth";
import { API_URL } from "@/config";

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Server responded with:",
          error.response.status,
          error.response.data
        );
        if (error.response.status === 400) {
          throw new Error(
            "Invalid registration data. Please check your information."
          );
        } else if (error.response.status === 409) {
          throw new Error("A user with this email already exists.");
        } else {
          throw new Error("An error occurred while registering");
        }
      } else if (error.request) {
        console.error("No response received from server");
        throw new Error(
          "An error occurred while attempting to register. Please try again."
        );
      } else {
        console.error("Error setting up the request:", error.message);
        throw new Error("An unexpected error occurred while registering");
      }
    }
    console.error("Unexpected error:", error);
    throw new Error(
      "An unexpected error occurred while attempting to register. Please try again."
    );
  }
};
