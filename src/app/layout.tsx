import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/src/provider/ReduxProvider";
import Footer from "@/src/components/shared/Footer";
import Navbar from "@/src/components/shared/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Root Pi Square - Learn Any Subject",
  description: "Master Math, Science, Physics, Chemistry & more.",
  themeColor: "#051005",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg-dark text-text-primary antialiased">
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: { zIndex: 99999999 },
          }}
        />
        <ReduxProvider>
          {" "}
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
