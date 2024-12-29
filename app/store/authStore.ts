import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

type LoginResult = {
  success: boolean; // 成功か失敗かを示すフラグ
  message: string; // 成功/失敗に応じたメッセージ
};

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      login: async (email: string, password: string) => {
        try {
          const response = await axios.post(
            `${API_URL}/api/token/`,
            {
              email: email,
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const accessToken = response.data.access;
          const refreshToken = response.data.refresh;
          console.log(accessToken);
          console.log(refreshToken);
          set({ isAuthenticated: true, accessToken, refreshToken });

          console.log("Login successful");
          return { success: true, message: "Login successful" };
        } catch (error) {
          // エラー処理（失敗時）
          console.error("Login failed:", error);
          // ユーザーにエラーメッセージを表示するためのデータを返す
          return { success: false, message: "Invalid email or password" };
        }
      },
      logout: () => {
        set({ isAuthenticated: false, accessToken: null, refreshToken: null });
        console.log("User logged out");
      },
    }),
    {
      name: "auth-storage", // localStorageに保存されるキー名
    }
  )
);

export default useAuthStore;
