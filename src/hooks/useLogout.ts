"use client";

import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Clear the token (must match the name in your proxy.ts)
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    
    // 2. Clear local storage
    localStorage.clear();

    // 3. Redirect and Refresh
    router.push("/login");
    router.refresh(); 
  };

  return { handleLogout };
};