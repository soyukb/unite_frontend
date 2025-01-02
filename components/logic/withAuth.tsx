"use client";
import useAuthStore from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const withAuth = (WrappedComponent: React.ComponentType) => {
  return function AuthWrapper(props: any) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const router = useRouter();
    const isRehydrated = useAuthStore.persist.hasHydrated(); // 状態が復元されたか確認

    useEffect(() => {
      if (isRehydrated && !isAuthenticated) {
        router.push("/admin");
      }
    }, [isAuthenticated, isRehydrated, router]);

    if (!isRehydrated) {
      return null; // 状態復元中は何も表示しない
    }

    return <WrappedComponent {...props} />;
  };
};
