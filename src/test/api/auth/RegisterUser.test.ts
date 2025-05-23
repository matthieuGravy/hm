import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { API_URL } from "@/config";
import { registerUser } from "@/api/auth/registerUser";
import { RegisterData } from "@/types/auth";

vi.mock("@/config", () => ({
  API_URL: import.meta.env.VITE_API_URL,
}));

vi.mock("axios");

describe("registerUser", () => {
  const mockUserData: RegisterData = {
    email: "test_user@example.com",
    password1: "password123",
    password2: "password123",
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("successfully registers a user", async () => {
    const mockResponse = {
      data: { success: true, message: "User registered successfully" },
    };
    vi.mocked(axios.post).mockResolvedValue(mockResponse);

    const result = await registerUser(mockUserData);

    expect(axios.post).toHaveBeenCalledWith(
      `${API_URL}/auth/registration`,
      mockUserData
    );
    expect(result).toEqual(mockResponse.data);
  });

  it("throws an error when registration fails", async () => {
    const mockError = new Error("Registration failed");
    vi.mocked(axios.post).mockRejectedValue(mockError);

    await expect(registerUser(mockUserData)).rejects.toThrow();
  });
});
