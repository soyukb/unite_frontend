import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard description",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {/* 管理画面用のヘッダーやナビゲーションなど */}
      <main>{children}</main>
    </div>
  );
}
