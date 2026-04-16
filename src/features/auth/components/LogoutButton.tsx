"use client";

import { useRouter } from "next/navigation";
import { authApi } from "@/features/auth/auth.api";
import { useAuthStore } from "@/features/auth/auth.store";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authApi.logout(); // backend call
    } catch (err) {
      console.log("Logout API failed, still logging out locally");
    }

    logout(); // clear frontend state
    router.push("/login"); // redirect
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
    >
      Logout
    </button>
  );
}