import { api } from "../../lib/api";
import type { ApiResponse, LoginData } from "../../types/api";

export async function login(payload: { email: string; password: string }) {
  const response = await api.post<ApiResponse<LoginData>>("/auth/login", payload);

  if (!response.data.data) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}
