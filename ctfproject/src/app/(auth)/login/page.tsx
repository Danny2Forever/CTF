"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, Flag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface LoginData {
  username: string;
  password: string;
}

export const VALIDATION_MESSAGES = {
  PASSWORD_MISMATCH: "รหัสผ่านและการsยืนยันรหัสผ่านไม่ตรงกัน",
  TERMS_REQUIRED: "กรุณายอมรับข้อกำหนดการใช้บริการและความเป็นส่วนตัว",
  INVALID_PHONE: "กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง (เช่น 0812345678)",
  GENERIC_ERROR: "เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง",
};

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     router.push('/mycourse');
  //   }
  // }, [router]);

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const userData: LoginData = {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
      };

      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      console.log("Login response data:", data);
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(data.message || "เข้าสู่ระบบไม่สำเร็จ");
      }

      if (data.token) {
        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days expiration
      } else {
        console.warn('No token received from the server');
      }

      toast.success("เข้าสู่ระบบสำเร็จ", {
        duration: 3000,
        position: "bottom-right",
      });
      router.push("/mycourse");
    } catch (error) {
      const errorMessage =
        error instanceof Error &&
        Object.values(VALIDATION_MESSAGES).includes(error.message)
          ? error.message
          : "เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง";

      toast.error(errorMessage, {
        duration: 3000,
        position: "bottom-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white flex">
        {/* Left section */}
        <div className="w-2/6 md:min-w-[400px] lg:min-w-[35vw] bg-white p-8 hidden md:flex items-center justify-center bg-gradient-to-tl from-purple-50/20   via-purple-50/0">
          <div
            data-aos="zoom-out"
            data-aos-duration="1000"
            className="m-auto flex flex-row text-6xl font-semibold"
          >
            <Flag className="h-14 w-14 text-blue-500" />
            <h1 className="text-primary">Fugaru</h1>
          </div>
        </div>

        {/* Right section */}
        <div className="w-full bg-purple-50 p-8 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-8">
            <div>
              <h2 className="text-4xl py-1 font-bold w-fit bg-gradient-to-bl from-primary to-[#3B82F6] bg-clip-text text-transparent">
                Sign in
              </h2>
              <p className="text-gray-600">
                มาเริ่มต้นสัมผัสประสบการณ์ใหม่ไปกับเราเลย
              </p>
              <p className="text-gray-600 text-sm">
                ยังไม่มีบัญชี?{" "}
                <Link href="register" className="text-blue-600 hover:underline">
                  สมัครสมาชิก
                </Link>
              </p>
            </div>

            <form onSubmit={submitLogin} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username or Email / ชื่อผู้ใช้หรืออีเมล"
                  name="username"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password / รหัสผ่าน"
                  name="password"
                  minLength={1}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <p className="text-gray-600 text-sm">
                หรือว่า{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  ลืมรหัสผ่าน
                </Link>{" "}
                หรือเปล่า?
              </p>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>กำลังดำเนินการ...</span>
                  </div>
                ) : (
                  "เข้าสู่ระบบ"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;