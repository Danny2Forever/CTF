"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center px-6 py-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
        <p className="text-3xl md:text-4xl font-semibold mb-2">ไม่พบหน้าที่คุณต้องการ</p>
        <p className="text-lg text-gray-600 mb-8">
          ดูเหมือนว่าจะไม่มีหน้าที่คุณตามหาอยู่นะ
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
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft size={18} />
          กลับไปหน้าก่อนหน้า
        </Button>
        <Link href="/">
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Home size={18} />
            กลับไปหน้าหลัก
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
