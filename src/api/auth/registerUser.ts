import axios from "axios";
import { RegisterData } from "@/types/auth";
import { API_URL } from "@/config";

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/registration/`,
      userData
    ); // Mise à jour de l'URL
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
          // Gestion spécifique des erreurs de validation Django
          const errorMessage =
            error.response.data?.email?.[0] ||
            error.response.data?.password1?.[0] ||
            error.response.data?.password2?.[0] ||
            "Invalid registration data. Please check your information.";
          throw new Error(errorMessage);
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
