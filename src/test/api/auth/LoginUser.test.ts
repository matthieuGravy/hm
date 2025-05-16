import { describe, it, expect, vi, beforeEach } from "vitest";
import { API_URL } from "@/config";
import axios from "axios";
import { loginUser } from "@/api/auth/loginUser";
import { LoginData } from "@/types/auth";

vi.mock("@/config", () => ({
  API_URL: import.meta.env.VITE_API_URL,
}));
vi.mock("axios");
describe("loginUser", () => {
  const mockUserData: LoginData = {
    email: "test_user@example.com",
    password: "password123",
  };

  beforeEach(() => {
    vi.resetAllMocks();
    console.log = vi.fn();
    console.error = vi.fn();
  });

  it("successfully logs in a user", async () => {
    const mockResponse = { data: { success: true, token: "abc123" } };
    vi.mocked(axios.post).mockResolvedValue(mockResponse);

    const result = await loginUser(mockUserData);

    expect(axios.post).toHaveBeenCalledWith(
      `${API_URL}/auth/login`,
      mockUserData
    );
    expect(result).toEqual(mockResponse.data);
  });

  it("throws an error when login fails", async () => {
    const mockError = new Error("Login failed");
    vi.mocked(axios.post).mockRejectedValue(mockError);

    await expect(loginUser(mockUserData)).rejects.toThrow();
  });
});
