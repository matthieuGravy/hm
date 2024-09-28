import axios from "axios";
import { API_URL } from "./api";
import { RegisterData } from "@/types/auth";

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register (`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "Une erreur est survenue lors de l'inscription"
      );
    }
    throw new Error("Une erreur inattendue est survenue");
  }
};
