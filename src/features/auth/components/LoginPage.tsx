"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/auth.store";
import { authApi } from "@/features/auth/auth.api";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth, setLoading, setError, isLoading, error } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: true },
  });

// Is function ko apne LoginPage.tsx mein replace kar lein
const onSubmit = async (data: LoginFormData) => {
  try {
    setLoading(true);
    setError(null);

    // Ye authApi.login ab live URL use karega (neeche api file check karein)
    const response = await authApi.login({
      username: data.username,
      password: data.password,
    });

    // 1. Store state (Zustand)
    setAuth(response.user, response.accessToken);

    // 2. Save for persistence (Session/LocalStorage)
    // Zaroori: 'user' object ko stringify karke save karein taake courses page use kar sakay
    localStorage.setItem("user", JSON.stringify(response.user));
    
    if (data.rememberMe) {
      localStorage.setItem("access_token", response.accessToken);
    } else {
      sessionStorage.setItem("access_token", response.accessToken);
    }

    // 3. Success! Redirect to dashboard
    router.push("/dashboard");
    
  } catch (err: any) {
    // API error handling
    const message = err.response?.data?.message || err.message || "Invalid credentials";
    setError(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen w-full">
      {/* ── Left panel ── */}
      <div
        className="flex w-full flex-col justify-center bg-#EFF2FF px-10 md:w-[480px] md:px-14 lg:px-20"
      >
        {/* Logo */}
        
          <div className="mb-12 flex justify-center">
             <Image
             src="/images/logo.png"
              alt="Yuni Rides logo"
              width={180}
              height={60}
             className="object-contain"
  />
</div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col gap-1">
            <input
              {...register("username")}
              type="text"
              placeholder="Username"
              className={cn(
                "w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#8B1F7A] focus:ring-2 focus:ring-[#8B1F7A]/20",
                errors.username &&
                  "border-red-400 focus:border-red-400 focus:ring-red-200"
              )}
            />
            {errors.username && (
              <span className="text-xs text-red-500">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={cn(
                  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 pr-12 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#8B1F7A] focus:ring-2 focus:ring-[#8B1F7A]/20",
                  errors.password &&
                    "border-red-400 focus:border-red-400 focus:ring-red-200"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                {...register("rememberMe")}
                type="checkbox"
                className="h-5 w-5 cursor-pointer accent-[#8B1F7A] rounded"
              />
              <span className="text-sm text-gray-600">Remember password</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-gray-500 hover:text-[#8B1F7A]"
            >
              Forgotten password?
            </Link>
          </div>

          {/* API error */}
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Sign in button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-lg bg-[#8B1F7A] py-3.5 text-sm font-semibold text-white transition hover:bg-[#7a1a6a] disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>

      {/* ── Right panel — hero image ── */}
      <div className="relative hidden flex-1 md:block">
        <Image
          src="/images/login-hero.png"
          alt="Online Driver Training"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}