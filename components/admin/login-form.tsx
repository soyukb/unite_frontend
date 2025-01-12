import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">ログイン</h1>
        </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">
              ■メールアドレス<span className="text-sm ml-1">(半角英数字)</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">
              ■パスワード
              <span className="text-sm ml-1">(半角英数字8桁以上)</span>
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          {/* <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal">
              ログイン情報を保存する
            </Label>
          </div> */}
          <Button
            onClick={handleLogin}
            type="submit"
            className="w-full bg-[#E94E77] hover:bg-[#E94E77]/90 text-white"
          >
            ログイン
          </Button>
          {/* <div className="text-center">
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              パスワードをお忘れの方はこちら ＞
            </Link>
          </div> */}
        </form>
      </div>
    </div>
  );
}
