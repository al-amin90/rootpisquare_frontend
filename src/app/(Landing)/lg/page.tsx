"use client";

import { Suspense, useState, useEffect } from "react";
import { useLoginMutation } from "@/src/redux/features/auth/authApi";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { setToken } from "@/src/utils/auth";

function LoginPageContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    subdomain: "rootpisuare",
  });

  const [login] = useLoginMutation();

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push(redirect);
      const navigationTimer = setTimeout(() => {
        window.location.href = redirect;
      }, 100);
    }
  }, [router, redirect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
        subdomain: formData.subdomain,
      }).unwrap();

      if (result.success && result.data?.accessToken) {
        // Store token
        localStorage.setItem("accessToken", result.data.accessToken);
        setToken(result.data.accessToken);

        // Update Redux state
        dispatch(setUser({ accessToken: result.data.accessToken }));

        toast.success(result.message || "Login successful!");

        // Redirect to dashboard or previous page
        router.push(redirect);

        const navigationTimer = setTimeout(() => {
          if (window.location.pathname !== "/dashboard") {
            // console.log("Router push failed, using window.location");
            window.location.href = "/dashboard";
          }
        }, 100);
      } else {
        toast.error(result.message || "Login failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Login error:", error);

      if (error?.data?.message) {
        toast.error(error.data.message);
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F0A] via-[#051005] to-[#0A0F0A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#228B22]/10 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3DAA3D]/10 rounded-full filter blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#228B22]/5 rounded-full filter blur-3xl animate-pulse-glow"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-[#0F170F] to-[#0A0F0A] rounded-2xl border border-[#1F3521] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-0 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#228B22] to-[#2D8F2D] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl">📚</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3DAA3D] to-[#228B22] bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-[#A8C5A8] text-sm">
              Sign in to continue to Root Pi Square
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 pt-6">
            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-[#E8F5E8] text-sm font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#A8C5A8]" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-3 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg focus:border-[#228B22] focus:outline-none transition-all placeholder:text-[#7A9A7A]"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-5">
              <label className="block text-[#E8F5E8] text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#A8C5A8]" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg focus:border-[#228B22] focus:outline-none transition-all placeholder:text-[#7A9A7A]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#A8C5A8] hover:text-[#3DAA3D] transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#A8C5A8] hover:text-[#3DAA3D] transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Hidden Subdomain Field */}
            <input type="hidden" name="subdomain" value={formData.subdomain} />

            {/* Forgot Password Link */}
            <div className="text-right mb-6">
              <a
                href="#"
                className="text-sm text-[#3DAA3D] hover:text-[#228B22] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#228B22] to-[#2D8F2D] text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#228B22]/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="p-6 pt-0 text-center border-t border-[#1F3521] mt-2">
            <p className="text-[#A8C5A8] text-sm">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-[#3DAA3D] hover:text-[#228B22] font-semibold transition-colors"
              >
                Contact Admin
              </a>
            </p>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F170F]/80 rounded-full border border-[#1F3521] backdrop-blur-sm">
            <span className="text-[#3DAA3D] text-sm">✓</span>
            <span className="text-[#A8C5A8] text-xs">Secure Login</span>
            <span className="w-1 h-1 bg-[#1F3521] rounded-full"></span>
            <span className="text-[#3DAA3D] text-sm">✓</span>
            <span className="text-[#A8C5A8] text-xs">SSL Encrypted</span>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 18s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
