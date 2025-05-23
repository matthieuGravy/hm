import axios from "axios";
import { API_URL } from "@/config";
import { useAuthStore } from "@/stores/authStore";

export const logoutUser = async () => {
  const url = `${API_URL}/api/auth/logout/`;
  const response = await axios.post(url);
  const { logout } = useAuthStore.getState();
  logout();
  return response.data;
};
