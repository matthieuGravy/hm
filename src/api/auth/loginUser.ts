import axios from "axios";
import { LoginData } from "@/types/auth";
import { API_URL } from "@/config";

export const loginUser = async (userData: LoginData) => {
  const url = `${API_URL}/api/auth/login`;
  console.log("Attempting to log in user:", userData.email);
  console.log("Login URL:", url);
  try {
    const response = await axios.post(url, userData);
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error details:", error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Server responded with:",
          error.response.status,
          error.response.data
        );
        if (error.response.status === 401) {
          throw new Error(
            "email adress or password is incorrect. Please try again."
          );
        } else if (error.response.status === 403) {
          throw new Error(
            "You do not have permission to access this resource."
          );
        } else {
          throw new Error("An error occurred while logging in");
        }
      } else if (error.request) {
        console.error("No response received from server");
        throw new Error(
          "An error occurred while attempting to log in. Please try again."
        );
      } else {
        console.error("Error setting up the request:", error.message);
        throw new Error("An unexpected error occurred while logging in");
      }
    }
    throw new Error(
      "An unexpected error occurred while attempting to log in. Please try again."
    );
  }
};
