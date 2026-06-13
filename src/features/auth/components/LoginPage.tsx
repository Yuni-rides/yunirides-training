

// "use client";

// import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react";
// import { useAuthStore } from "../auth.store";
// import { toast } from "@/hooks/useToast"; // Import Toast
// import { cn } from "@/lib/utils";

// export default function TrainingLoginPage() {
//   const router = useRouter();
//   const { login, loading, error: apiError } = useAuthStore();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(true);

//   const handleLogin = async (e: FormEvent) => {
//     e.preventDefault();

//     // ── LOGIN API CALL ──
//     const response = await login({ email, password });

//     if (response.success) {
//       // Role Check
//       if (response.user?.role !== "DRIVER") {
//         toast({
//           variant: "destructive",
//           title: "Access Denied",
//           description: "Only driver accounts are authorized for this training portal.",
//         });
//         return;
//       }

//       toast({
//         title: "Login successful",
//         description: "Welcome to your training dashboard.",
//       });

//       router.push("/dashboard");
//     } else {
//       // ── FAILURE CASE: TOAST SHOW KAREIN ──
//       toast({
//         variant: "destructive",
//         title: "Login failed",
//         description: response.message || "Invalid credentials provided.",
//       });
//     }
//   };

//   return (
//     <div className="flex min-h-screen w-full">
//       <div className="flex w-full flex-col justify-center bg-[#EFF2FF] px-10 md:w-[480px] md:px-14 lg:px-20">
//         <div className="mb-12 flex justify-center">
//           <Image
//             src="/images/logo.png"
//             alt="Yuni Rides logo"
//             width={180}
//             height={60}
//             className="object-contain"
//             priority
//           />
//         </div>

//         <form onSubmit={handleLogin} className="flex flex-col gap-4">
//           <div className="flex flex-col gap-1">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#8B1F7A] focus:ring-2 focus:ring-[#8B1F7A]/20"
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 pr-12 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#8B1F7A] focus:ring-2 focus:ring-[#8B1F7A]/20"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((v) => !v)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <label className="flex cursor-pointer items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 className="h-5 w-5 cursor-pointer accent-[#8B1F7A] rounded"
//               />
//               <span className="text-sm text-gray-600">Remember password</span>
//             </label>
//             <Link
//               href="/forgot-password"
//               className="text-sm text-gray-500 hover:text-[#8B1F7A]"
//             >
//               Forgotten password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="mt-2 w-full rounded-lg bg-[#8B1F7A] py-3.5 text-sm font-semibold text-white transition hover:bg-[#7a1a6a] disabled:opacity-60 cursor-pointer flex justify-center items-center"
//           >
//             {loading ? "Signing in..." : "Sign in"}
//           </button>
//         </form>
//       </div>

//       <div className="relative hidden flex-1 md:block">
//         <Image
//           src="/images/login-hero.png"
//           alt="Online Driver Training"
//           fill
//           className="object-cover"
//           priority
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../auth.store";
import { toast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";

export default function TrainingLoginPage() {
  const router = useRouter();
  
  // ── USER KO DIRECT STORE SE LIYA HAI ──
  const { login, loading, error: apiError, user: loggedInUser } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const response = await login({ email, password });

    if (response.success) {
      // ── STORE STATE SE LIYA GAYA USER VALUE YAHA CHECK HOGA ──
      // Note: Backend response mein code 'DRIVFR' ya 'DRIVER' ho sakta hai, 
      // aapke response screenshot mein 'DRIVFR' aa raha hai (typo backend se hai shayad).
      if (loggedInUser?.role !== "DRIVER" && loggedInUser?.role !== "DRIVFR") {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Only driver accounts are authorized for this training portal.",
        });
        return;
      }

      toast({
        title: "Login successful",
        description: "Welcome to your training dashboard.",
      });

      // Redirecting to dashboard
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: response.message || "Invalid credentials provided.",
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full flex-col justify-center bg-[#EFF2FF] px-10 md:w-[480px] md:px-14 lg:px-20">
        <div className="mb-12 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Yuni Rides logo"
            width={180}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#8B1F7A] focus:ring-2 focus:ring-[#8B1F7A]/20"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 pr-12 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#8B1F7A] focus:ring-2 focus:ring-[#8B1F7A]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
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

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-[#8B1F7A] py-3.5 text-sm font-semibold text-white transition hover:bg-[#7a1a6a] disabled:opacity-60 cursor-pointer flex justify-center items-center"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>

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
