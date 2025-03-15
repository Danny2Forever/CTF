"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from 'motion/react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-6xl md:text-7xl font-bold text-destructive mb-4">
          Oops!
        </h1>
        <p className="text-2xl md:text-3xl font-semibold mb-2">
          เกิดข้อผิดพลาดบางอย่าง
        </p>
        <p className="text-lg text-gray-600 mb-8">
          เราพบปัญหาในการแสดงผลหน้านี้ กรุณาลองใหม่อีกครั้ง
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <Button
          variant="default"
          size="lg"
          className="flex items-center gap-2"
          onClick={() => reset()}
        >
          <RefreshCw size={18} />
          ลองใหม่อีกครั้ง
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft size={18} />
          กลับไปหน้าก่อนหน้า
        </Button>
        <Link href="/">
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <Home size={18} />
            กลับไปหน้าหลัก
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
