"use client";
 
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center px-6 py-16">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-destructive mb-4">
              Something went wrong!
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-4">
              เกิดข้อผิดพลาดในระบบ
            </p>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              ระบบพบข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้งหรือติดต่อผู้ดูแลระบบ
            </p>
            <Button 
              variant="default"
              size="lg"
              onClick={() => reset()}
              className="flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={18} />
              ลองใหม่อีกครั้ง
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
