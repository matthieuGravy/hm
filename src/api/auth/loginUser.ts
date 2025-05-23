import axios from "axios";
import { LoginData } from "@/types/auth";
import { API_URL } from "@/config";
import { useAuthStore } from "@/stores/authStore";

export const loginUser = async (userData: LoginData) => {
  const { setLogin } = useAuthStore.getState();
  const url = `${API_URL}/api/auth/login/`;

  try {
    const response = await axios.post(url, userData);
    setLogin(userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
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
        throw new Error(
          "An error occurred while attempting to log in. Please try again."
        );
      } else {
        throw new Error("An unexpected error occurred while logging in");
      }
    }
    throw new Error(
      "An unexpected error occurred while attempting to log in. Please try again."
    );
  }
};
