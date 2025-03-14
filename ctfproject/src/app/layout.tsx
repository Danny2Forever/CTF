import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import AOSProvider from '../components/AOSProvider';

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Furagu",
  description: "Furagu Capture The Flag (CTF) Learning Platform Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <AOSProvider>
        {children}
        </AOSProvider>
        <Toaster
          theme="light"
          richColors
          className="w-[500px]"
          toastOptions={{
            style: {
              fontSize: '10px',
              minWidth: 'fit-content'
            },
            classNames: {
              toast: 'font-line-seed',
              title: 'text-xs md:text-lg whitespace-nowrap overflow-hidden text-ellipsis',
              description: 'text-sm',
            },
          }}
        />
      </body>
    </html>
  );
}