import axios from "axios";
import { API_URL } from "./api";
import { LoginData } from "@/types/auth";

export const loginUser = async (userData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "Une erreur est survenue lors de la connexion"
      );
    }
    throw new Error("Une erreur inattendue est survenue");
  }
};
