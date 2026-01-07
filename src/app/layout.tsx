import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";
import Footer from "../components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TourBook - Explore the World",
  description: "Book unique tours and experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Toaster position="top-center" />
          
          <div className="flex flex-col min-h-screen">
             <main className="flex-grow">
                {children}
             </main>
             
             {/* Add Footer Here */}
             <Footer /> 
          </div>

        </AuthProvider>
      </body>
    </html>
  );
}