import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { loginUser } from "@/api/auth/loginUser";
import { LoginData } from "@/types/auth";

vi.mock("axios");

describe("loginUser", () => {
  const mockUserData: LoginData = {
    email: "test@example.com",
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
      "https://backend-auth-beryl.vercel.app/auth/login",
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
