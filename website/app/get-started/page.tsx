"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Info, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        const workspaceName = formData.firstName
          ? `${formData.firstName}'s Workspace`
          : "My Workspace";

        await supabase.from("workspaces").insert([
          {
            name: workspaceName,
            owner_id: authData.user.id,
          },
        ]);
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to create account. Please try again.";

      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-between py-10 px-4 bg-[#070709] text-white font-sans">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <Link
          href="/"
          className="flex items-center gap-3 mb-8 cursor-pointer group"
        >
          <div className="relative w-10 h-10">
            <img
              src="/aegisora-logo-white.png"
              alt="Logo"
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
            />
            <img
              src="/aegisora-logo-blue.png"
              alt="Logo Blue"
              className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
          <span className="text-3xl font-serif tracking-tight text-gray-200 group-hover:text-[#0066EE] transition-colors">
            Aegisora
          </span>
        </Link>

        <div className="w-full max-w-[460px] flex flex-col gap-4">
          <div className="w-full bg-[#0066EE]/10 border border-[#0066EE]/30 rounded-2xl p-4 flex items-start gap-3 backdrop-blur-md shadow-lg">
            <Info className="w-4 h-4 text-[#0066EE] mt-0.5 flex-shrink-0" />
            <p className="text-[12px] text-blue-100/90 leading-relaxed font-mono">
              Please use your enterprise work email to set up your initial AI
              governance workspace.
            </p>
          </div>

          <div className="w-full bg-[#121215] border border-gray-800/80 rounded-[28px] p-8 shadow-2xl flex flex-col">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-serif font-medium tracking-tight mb-1.5">
                Create your account
              </h1>
              <p className="text-[12px] font-mono text-gray-400">
                Welcome! Please fill in the details to get started.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400 text-xs font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono text-gray-400">
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full bg-[#19191d] border border-gray-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#0066EE]/60 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono text-gray-400">
                    Last name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full bg-[#19191d] border border-gray-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#0066EE]/60 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono text-gray-400">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[#19191d] border border-gray-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#0066EE]/60 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono text-gray-400">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-[#19191d] border border-gray-800 rounded-xl px-3.5 py-3 pr-10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#0066EE]/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#0066EE] hover:bg-[#005bb5] text-white font-medium text-[13px] rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Sign up free</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-400 font-mono">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-white font-medium hover:text-[#0066EE] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
