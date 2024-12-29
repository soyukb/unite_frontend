"use client";

import LoginForm from "@/components/login-form";
import { useState } from "react";
import useAuthStore from "@/app/store/authStore";
import { useRouter } from "next/navigation";

export default function Admin() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState(""); // メールアドレスの状態
  const [password, setPassword] = useState(""); // パスワードの状態
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // フォーム送信のデフォルト動作を防ぐ

    if (email && password) {
      try {
        const result = await login(email, password); // Zustandストアの`login`関数を呼び出し
        if (result.success) {
          // ログイン成功時にページ遷移
          router.push("/dashboard"); // 遷移先ページ
        } else {
          // ログイン失敗時に通知
          alert("ログインに失敗しました。もう一度お試しください。");
        }
      } catch (error) {
        console.error("ログイン中にエラーが発生しました:", error);
        alert("エラーが発生しました。もう一度お試しください。");
      }
    } else {
      alert("メールアドレスとパスワードを入力してください。");
    }
  };
  return (
    <div>
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </div>
  );
}
